import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RoomPage } from '../room/room'
import { DataProvider } from '../../providers/data/data';
import { DataManagerProvider } from '../../providers/data-manager/data-manager';
import { BcnationRestProvider } from '../../providers/bcnation-rest/bcnation-rest';
import { ChatRoomPage } from '../chat-room/chat-room';

@IonicPage({name: 'Chat'})
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

	data: any[];
  rooms: any[];
  username: string;
  rooms_id: string = '0';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  	public dataService: DataProvider,
    public dataManager: DataManagerProvider,
    public bcnationService:BcnationRestProvider) {

      //this.dataManager.deleteRoom(1);
  }

  ionViewDidEnter() {

    this.rooms_id = '0';

    this.dataService.get_data().then((val) => {
      if(val){
        this.data = val;
        this.username = val.email;
        this.dataManager.getidRooms().then((rooms)=>{
          for(let room of rooms) {
            this.rooms_id += ","+room.id;
          }
          this.bcnationService.getRoomsUser({username:this.username, rooms_id:this.rooms_id})
          .subscribe((data) => { // Success
            for(let room of data['rows']) {
              this.dataManager.addRoom(room.id, room.key, room.roomname).then(()=>{})
            }
            this.getRooms();
          },
          (error) =>{
            console.log("registro agregado");
            console.error(error);
          }
          );        
        })
      }
    });

  }

  getRooms(){
    this.dataManager.getRooms().then((rooms) => {this.rooms = rooms})
  }

  showRooms(){
  	this.navCtrl.push(RoomPage, {nickname: this.username});
  }

  joinRoom(key,roomname) {
    console.log("no se: "+key);
    this.navCtrl.push(ChatRoomPage, {
      key:key,
      roomname:roomname,
      nickname:this.username,
      onroom:1
    });
  }

}
