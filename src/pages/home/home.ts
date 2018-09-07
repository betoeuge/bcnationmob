import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { BcnationRestProvider } from '../../providers/bcnation-rest/bcnation-rest';
import { SpeakersPage } from '../speakers/speakers';
import { SponsorsPage } from '../sponsors/sponsors';
import { SpeakersDetailsPage } from '../speakers/speakers';
import { BecomeSponsorPage } from '../become/become';
import { BecomeMediaPage } from '../become/become';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Calendar } from '@ionic-native/calendar';

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
  static_host: string = '';

  constructor(
  	public navCtrl: NavController,
  	public bcnationService: BcnationRestProvider,
  	public loadingController:LoadingController,
    private inappBrowse: InAppBrowser,
    private calendar: Calendar
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

    this.bcnationService.getAgenda()
    .subscribe(
      (data) => { // Success
        this.static_host = data['static_host'];
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

  handleClick(event) {
    if (event.target.tagName == "A") {
      this.inappBrowse.create(event.target.href, "_blank", "hidden=no,toolbar=yes,location=no,presentationstyle=fullscreen,clearcache=yes,clearsessioncache=yes");
      return false;
    }
  }

  toggleSection(a, i) {
    this.agenda[a].rooms[i].open = !this.agenda[a].rooms[i].open;
  }
 
  toggleItem(a, i, j) {
    this.agenda[a].rooms[i].sesions[j].open = !this.agenda[a].rooms[i].sesions[j].open;
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

  addToCalendar(title, location, dateFrom, dateTo, timeFrom, timeTo){
    var dateFromAux = dateFrom.split("-");
    var dateToAux = dateTo.split("-");
    var timeFromAux = timeFrom.split(":");
    var timeToAux = timeTo.split(":");
    var startDate = new Date(dateFromAux[0],dateFromAux[1]-1,dateFromAux[2],timeFromAux[0],timeFromAux[1],0,0);
    var endDate = new Date(dateToAux[0],dateToAux[1]-1,dateToAux[2],timeToAux[0],timeToAux[1],0,0);
    this.calendar.createEventInteractively(title, location, '', startDate, endDate);
  }


}