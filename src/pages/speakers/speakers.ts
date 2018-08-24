import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BcnationRestProvider } from '../../providers/bcnation-rest/bcnation-rest';

@Component({
  selector: 'page-speakers',
  templateUrl: 'speakers.html'
})
export class SpeakersPage {

  speakers: any[] = [];

  constructor(
  	public navCtrl: NavController,
  	public bcnationService: BcnationRestProvider
  	) {

  }

  ionViewDidLoad(){
    this.loading = true;
    this.bcnationService.getSpeakers()
    .subscribe(
      (data) => { // Success
        this.speakers = data['speakers'];
        this.loading = false;
      },
      (error) =>{
        console.error(error);
        this.loading = false;
      }
    )
  }


}
