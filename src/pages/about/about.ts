import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { BcnationRestProvider } from '../../providers/bcnation-rest/bcnation-rest';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  about: any[] = [];
	social: any[] = [];
  static_host: string = '';

  constructor(
  	public navCtrl: NavController,
  	public bcnationService: BcnationRestProvider,
  	public loadingController:LoadingController,
    private inappBrowse: InAppBrowser
  	) {

  }

  ionViewDidLoad() {
    let loading = this.loadingController.create({content : "Getting Info, please wait..."});
    loading.present();
    this.bcnationService.getAbout()
    .subscribe(
      (data) => { // Success
      	loading.dismissAll();
        this.static_host = data['static_host'];
        this.about = data['about'];
        this.social = data['social'];
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
