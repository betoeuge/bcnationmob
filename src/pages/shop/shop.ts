import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { BcnationRestProvider } from '../../providers/bcnation-rest/bcnation-rest';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the ShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {

	shop: any[] = [];
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
    this.bcnationService.getShop()
    .subscribe(
      (data) => { // Success
      	loading.dismissAll();
        this.static_host = data['static_host'];
        this.shop = data['shop'];
      },
      (error) =>{
        console.error(error);
      }
    )
  }

  handleClick(url) {
    this.inappBrowse.create(url, "_blank", "hidden=no,toolbar=yes,location=no,presentationstyle=fullscreen,clearcache=yes,clearsessioncache=yes");
    return false;
  }


}
