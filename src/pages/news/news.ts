import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { BcnationRestProvider } from '../../providers/bcnation-rest/bcnation-rest';
import { InAppBrowser } from '@ionic-native/in-app-browser';

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
      this.inappBrowse.create(event.target.href, "_blank", "hidden=no,toolbar=yes,location=no,presentationstyle=fullscreen,clearcache=yes,clearsessioncache=yes");
      return false;
    }
  }

}
