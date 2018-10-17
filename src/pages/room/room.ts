import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BcnationRestProvider } from '../../providers/bcnation-rest/bcnation-rest';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { AddRoomPage } from '../add-room/add-room';
import { ChatRoomPage } from '../chat-room/chat-room';

@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})

export class RoomPage {
  rooms : any[] = [];
  nickname:string;

  constructor(public navCtrl:NavController,public navParams:NavParams,
    public bcnationService:BcnationRestProvider,private socket:Socket
  ){
    this.nickname = this.navParams.get("nickname") as string;
    //Get room when add new from server
    this.getRooms().subscribe(room => {
      this.rooms.push(room);
    });
  }
 
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
    //Get rooms from server
    this.bcnationService.getRooms({nickname:this.nickname})
      .subscribe((data) => { // Success
        this.rooms = data['rows'];
      },
      (error) =>{console.error(error)}
    );
  }
  ionViewWillLeave() {
    console.log("ionViewWillLeave RoomPage .-Looks like I'm about to leave :(");
  }
  ionViewDidLeave() {
    console.log("ionViewDidLeave RoomPage");
  }
  ionViewWillUnload() {
    console.log("ionViewWillUnload RoomPage");
  }
    
  addRoom() {
    this.navCtrl.push(AddRoomPage);
    //this.socket.emit('add_rooms', { text: "" });
  }

  joinRoom(key,roomname,onroom) {
    this.navCtrl.push(ChatRoomPage, {
      key:key,
      roomname:roomname,
      nickname:this.navParams.get("nickname"),
      onroom:onroom
    });
  }

  getRooms() {
    let observable = new Observable(observer => {
      this.socket.on('newRoom', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

}