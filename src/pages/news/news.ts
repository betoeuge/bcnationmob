import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { BcnationRestProvider } from '../../providers/bcnation-rest/bcnation-rest';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news', 
  templateUrl: 'news.html',
})
export class NewsPage {

  news: any[] = [];

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public bcnationService: BcnationRestProvider,
  	public loadingController:LoadingController,
    private inappBrowse: InAppBrowser
  	) {
  }

  ionViewDidLoad() {
    let loading = this.loadingController.create({content : "Getting News, please wait..."});
    loading.present();
    this.bcnationService.getNews()
    .subscribe(
      (data) => { // Success
      	loading.dismissAll();
        this.news = data['rss']['channel']['item'];
      },
      (error) =>{
        console.error(error);
      }
    )
  }

  handleClick(event) {
    if (event.target.tagName == "A") {
      this.inappBrowse.create(event.target.href);
      return false;
    }
  }

}
