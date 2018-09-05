import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { BcnationRestProvider } from '../../providers/bcnation-rest/bcnation-rest';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

	about: any[] = [];
  static_host: string = '';

  constructor(
  	public navCtrl: NavController,
  	public bcnationService: BcnationRestProvider,
  	public loadingController:LoadingController
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
      },
      (error) =>{
        console.error(error);
      }
    )
  }


}
