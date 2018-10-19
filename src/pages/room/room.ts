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
 
  ionViewDidEnter() {
    this.bcnationService.getRooms({nickname:this.nickname})
      .subscribe((data) => { // Success
        this.rooms = data['rows'];
      },
      (error) =>{console.error(error)}
    );
  }
    
  addRoom() {
    this.navCtrl.push(AddRoomPage);
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