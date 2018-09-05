import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { BcnationRestProvider } from '../../providers/bcnation-rest/bcnation-rest';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-sponsors',
  templateUrl: 'sponsors.html',
})
export class SponsorsPage {

	sponsors: any[] = [];
	media: any[] = [];
  static_host: string = '';

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public bcnationService: BcnationRestProvider,
    public loadingController:LoadingController,
    private inappBrowse: InAppBrowser) {
  }

  ionViewDidLoad() {
    let loading = this.loadingController.create({content : "Retrieving data, please wait..."});
    loading.present();

    this.bcnationService.getSponsors()
    .subscribe(
      (data) => { // Success
        loading.dismissAll();
        this.static_host = data['static_host'];
        this.sponsors = data['sponsors'];
      },
      (error) =>{
        console.error(error);
      }
    )

    this.bcnationService.getMedia()
    .subscribe(
      (data) => { // Success
        this.static_host = data['static_host'];
        this.media = data['media'];
      },
      (error) =>{
        console.error(error);
      }
    )
  }

  handleClick(event) {
    if (event.target.tagName == "A") {
      this.inappBrowse.create(event.target.href, "_blank", "hidden=no,toolbar=yes,location=no,presentationstyle=fullscreen,clearcache=yes,clearsessioncache=yes");
      return false;
    }
  }

}
