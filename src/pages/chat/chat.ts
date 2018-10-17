import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RoomPage } from '../room/room'
import { DataProvider } from '../../providers/data/data';

@IonicPage({name: 'Chat'})
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

	data: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public dataService: DataProvider,) {

	this.dataService.get_data().then((val) => {
        this.data = val;
    });

  }

  ionViewDidLoad() {
  }

  rooms(){
  	this.navCtrl.push(RoomPage, {nickname: this.data.email});
  }

}
