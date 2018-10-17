import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Socket} from 'ng-socket-io';

@IonicPage()
@Component({
  selector: 'page-add-room',
  templateUrl: 'add-room.html',
})
export class AddRoomPage {

  data = { roomname:'' };
  //ref = firebase.database().ref('chatrooms/');

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private socket : Socket, 
  ){}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddRoomPage');
  }

  addRoom() {
console.log("aqui"+this.data.roomname)
    /*
    let newData = this.ref.push();
    newData.set({
      roomname:this.data.roomname
    });
    */
    this.socket.emit('add-room', { 
      roomname:this.data.roomname
    });
    this.navCtrl.pop();
  }

}