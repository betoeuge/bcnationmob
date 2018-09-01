import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { BcnationRestProvider } from '../../providers/bcnation-rest/bcnation-rest';

/**
 * Generated class for the SponsorsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sponsors',
  templateUrl: 'sponsors.html',
})
export class SponsorsPage {

	sponsors: any[] = [];
	media: any[] = [];

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public bcnationService: BcnationRestProvider,
    public loadingController:LoadingController) {
  }

  ionViewDidLoad() {
    let loading = this.loadingController.create({content : "Retrieving data, please wait..."});
    loading.present();

    this.bcnationService.getSponsors()
    .subscribe(
      (data) => { // Success
        loading.dismissAll();
        this.sponsors = data['sponsors'];
      },
      (error) =>{
        console.error(error);
      }
    )

    this.bcnationService.getMedia()
    .subscribe(
      (data) => { // Success
        this.media = data['media'];
      },
      (error) =>{
        console.error(error);
      }
    )
  }

}
