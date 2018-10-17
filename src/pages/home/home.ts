import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { BcnationRestProvider } from '../../providers/bcnation-rest/bcnation-rest';
import { SpeakersPage } from '../speakers/speakers';
import { SponsorsPage } from '../sponsors/sponsors';
import { SpeakersDetailsPage } from '../speakers/speakers';
import { BecomeSponsorPage } from '../become/become';
import { BecomeMediaPage } from '../become/become';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  home: any[] = [];
  speakers: any[] = [];
  sponsors: any[] = [];
  media: any[] = [];
  showspeakers: boolean = false;
  showsponsors: boolean = false;
  pushSpeakers = SpeakersPage;
  pushSponsors = SponsorsPage;
  static_host: string = '';

  constructor(
  	public navCtrl: NavController,
  	public bcnationService: BcnationRestProvider,
  	public loadingController:LoadingController,
    private inappBrowse: InAppBrowser
  	) {
  }

  ionViewDidLoad(){

	let loading = this.loadingController.create({content : "Retrieving data, please wait..."});
	loading.present();

    this.bcnationService.getHome()
    .subscribe(
      (data) => { // Success
      	loading.dismissAll();
        this.static_host = data['static_host'];
        this.home = data['home'];
      },
      (error) =>{
        console.error(error); 
      }
    )

    this.bcnationService.getTopSpeakers()
    .subscribe(
      (data) => { // Success
        this.static_host = data['static_host'];
        this.speakers = data['speakers'];
        if(data['active']){
          this.showspeakers = true;
        }
      },
      (error) =>{
        console.error(error);
      }
    )

    this.bcnationService.getTopSponsors()
    .subscribe(
      (data) => { // Success
        this.static_host = data['static_host'];
        this.sponsors = data['sponsors'];
        if(data['active']){
          this.showsponsors = true;
        }
      },
      (error) =>{
        console.error(error);
      }
    )

    this.bcnationService.getTopMedia()
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

  openSpeaker(speaker) {
    this.navCtrl.push(SpeakersDetailsPage, { speaker: speaker, static_host: this.static_host });
  }

  openBecomeSponsor() {
    this.navCtrl.push(BecomeSponsorPage);
  }

  openBecomeMedia() {
    this.navCtrl.push(BecomeMediaPage);
  }

}