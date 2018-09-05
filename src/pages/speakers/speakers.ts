import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { BcnationRestProvider } from '../../providers/bcnation-rest/bcnation-rest';

@Component({
  templateUrl: 'speakers-details.html',
})
export class SpeakersDetailsPage {
  speaker;
  static_host;

  constructor(params: NavParams) {
    this.speaker = params.data.speaker;
    this.static_host = params.data.static_host;
  }
}

@Component({
  selector: 'page-speakers',
  templateUrl: 'speakers.html' 
})
export class SpeakersPage {

  items: any[] = [];
  speakers: any[] = [];
  static_host: string = '';

  constructor(
  	public navCtrl: NavController,
  	public bcnationService: BcnationRestProvider,
    public loadingController:LoadingController
  	) {

  }

  ionViewDidLoad(){
    let loading = this.loadingController.create({content : "Retrieving data, please wait..."});
    loading.present();
    this.bcnationService.getSpeakers()
    .subscribe(
      (data) => { // Success
        loading.dismissAll();
        this.static_host = data['static_host'];
        this.items = data['speakers'];
        this.speakers = this.items;
      },
      (error) =>{
        console.error(error);
      }
    )
  }

  openItem(speaker) {
    this.navCtrl.push(SpeakersDetailsPage, { speaker: speaker, static_host: this.static_host });
  }

  searchSpeakers(ev){
    var val = ev.target.value;
    if (val && val.trim() != '') {
      this.speakers = this.items.filter((speaker) => {
        return ((speaker['first_name'] + speaker['last_name']).toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }else{
      this.speakers = this.items;
    }
  }


}
