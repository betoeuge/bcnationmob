import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { BcnationRestProvider } from '../../providers/bcnation-rest/bcnation-rest';
import { SpeakersPage } from '../speakers/speakers';
import { SponsorsPage } from '../sponsors/sponsors';
import { SpeakersDetailsPage } from '../speakers/speakers';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage { 

  home: any[] = [];
  speakers: any[] = [];
  sponsors: any[] = [];
  media: any[] = [];
  agenda_days: any[] = [];
  agenda: any[] = [];
  showspeakers: boolean = false;
  showsponsors: boolean = false;
  showagenda: boolean = false;
  pushSpeakers = SpeakersPage;
  pushSponsors = SponsorsPage;

  constructor(
  	public navCtrl: NavController,
  	public bcnationService: BcnationRestProvider,
  	public loadingController:LoadingController
  	) {
  }

  ionViewDidLoad(){

	let loading = this.loadingController.create({content : "Retrieving data, please wait..."});
	loading.present();

    this.bcnationService.getHome()
    .subscribe(
      (data) => { // Success
      	loading.dismissAll();
        this.home = data['home'];
      },
      (error) =>{
        console.error(error); 
      }
    )

    this.bcnationService.getTopSpeakers()
    .subscribe(
      (data) => { // Success
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
        this.media = data['media'];
      },
      (error) =>{
        console.error(error);
      }
    )

    this.bcnationService.getAgenda()
    .subscribe(
      (data) => { // Success
        this.agenda_days = data['days'];
        this.agenda = data['agenda'];
        if(data['active']){
          this.showagenda = true;
        }
      },
      (error) =>{
        console.error(error);
      }
    )

  }

  toggleSection(a, i) {
    this.agenda[a].rooms[i].open = !this.agenda[a].rooms[i].open;
  }
 
  toggleItem(a, i, j) {
    this.agenda[a].rooms[i].sesions[j].open = !this.agenda[a].rooms[i].sesions[j].open;
  }

  openSpeaker(speaker) {
    this.navCtrl.push(SpeakersDetailsPage, { speaker: speaker });
  }


}