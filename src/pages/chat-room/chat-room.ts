import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, LoadingController, AlertController } from 'ionic-angular';
import { RoomPage } from '../room/room';
import { BcnationRestProvider } from '../../providers/bcnation-rest/bcnation-rest';
import { Socket} from 'ng-socket-io';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'page-chat-room',
  templateUrl: 'chat-room.html',
})

export class ChatRoomPage {
  @ViewChild(Content) content: Content;
 
  data = { type:'', nickname:'', message:'' };
  chat = { arrOnChat:[], }
  chats = [];
  roomkey:string;
  roomname:string;
  nickname:string;
  offStatus:boolean = false;
  autoScroll:boolean = true;
  onChatRoom:boolean = false;
  smsUnRead = 0;

  constructor(public navCtrl:NavController, public navParams:NavParams, public bcnationService:BcnationRestProvider, 
    public loadingController:LoadingController, private socket:Socket, 
    private alertCtrl: AlertController
  ){
    this.roomkey = this.navParams.get("key") as string;
    this.roomname = this.navParams.get("roomname") as string;
    this.nickname = this.navParams.get("nickname") as string;
    this.data.type = 'message';
    this.data.nickname = this.nickname;
    let loading = this.loadingController.create({content : "Getting Chat, please wait..."});
    loading.present();
    this.socket.emit('set-nickname', {nickname:this.nickname,roomkey:this.roomkey});
    //Get chat for this room from server
    this.bcnationService.getChatRoom({roomkey:this.roomkey})
    .subscribe(
      (data) => { // Success
        loading.dismissAll();
        this.chats = data['rows'];
        this.scrollToBottom(); //this.content.scrollToBottom(0);
      },
      (error) => {console.error(error)}
    );

    this.getMessages().subscribe(message => {
      this.chats.push(message);
      this.smsUnRead = (this.autoScroll===true) ? 0 : this.smsUnRead+1;
      this.scrollToBottom();
    });

  }//end Constructor

  ionViewDidLoad(){
    /**
     * Runs when the page has loaded. This event only happens once per page being created. 
     * If a page leaves but is cached, then this event will not fire again on a subsequent viewing. 
     * The ionViewDidLoad event is good place to put your setup code for the page.
     */
    //console.log('ionViewDidLoad ChatRoomPage');
  }
  ionViewWillEnter() {
    /**
     * Runs when the page is about to enter and become the active page.
     */
    //console.log("ionViewWillEnter ChatRoomPage");
  }
  ionViewDidEnter() {
    /**
     * Runs when the page has fully entered and is now the active page. 
     * This event will fire, whether it was the first load or a cached page.
     */
    //console.log("ionViewDidEnter ChatRoomPage");
    this.content.ionScrollEnd.subscribe((event)=>{ //Event scroll end
      let dimensions = this.content.getContentDimensions();
      let scrollTop = this.content.scrollTop + dimensions.contentHeight;
      let scrollHeight = dimensions.scrollHeight;
      //autoScroll off cuando el usurio scrolea 30% o mas de la pantalla
      if ((scrollHeight-scrollTop) > (dimensions.contentHeight/3)){
        this.autoScroll = false;
      } else {
        this.autoScroll = true;
        this.smsUnRead = 0;
      }
    });

    this.onChatRoom=this.navParams.get("onroom") as boolean;
    this.offStatus = !this.onChatRoom;
  }

  sendMessage() {
    if (this.data.message!=''){
      this.autoScroll = true;
      this.socket.emit('add-message', { 
        type:this.data.type,
        user:this.data.nickname,
        message:this.data.message,
        sendDate:Date(),
        roomkey:this.roomkey
      });
      this.data.message = '';
    }
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message'+this.roomkey, (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

  joinChat() {
    this.data.type = 'join';
    this.data.message = this.nickname+'  has joined this room.'
    this.sendMessage(); 
    this.data.type =  'message';
    this.onChatRoom = true;
    this.offStatus = false;
  }

  exitChat() {
    //console.log("Saliendo...");
    this.data.type = 'exit';
    this.data.message = this.nickname+' has exited this room.'
    this.sendMessage(); 

    this.data.type =  'message';
    this.onChatRoom = false;
    this.offStatus = true;

    //back to room page
    this.navCtrl.pop();
  }
  alertExitChat(){
    let alert = this.alertCtrl.create({
      title: 'Confirm to exit',
      message: 'Are you sure you want to exit this Chat Room?',
      buttons: [
        {text: 'No', handler: () => {/*console.log('Cancel exit');*/}},
        {text: 'Yes', handler: () => {this.exitChat();}}
      ]
    });
    alert.present();
  }

  clickScrollDown(){
    this.autoScroll=true;
    this.scrollToBottom();  
  }
  scrollToBottom(){
    setTimeout(() => {
      if(this.autoScroll===true) { //(this.offStatus === false)
        this.smsUnRead = 0;
        try{
          //let scrollHeight = this.content.getContentDimensions().scrollHeight;
          this.content.scrollToBottom(300); //this.content.scrollTo(0, scrollHeight, 300);
        }
        catch(err) {
          console.log("******** Catch error Scroll ********"+this.nickname)
          console.log(err.message);
        }
      }
    }, 100);
  }

}