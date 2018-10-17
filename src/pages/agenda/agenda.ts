import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { BcnationRestProvider } from '../../providers/bcnation-rest/bcnation-rest';
import { SpeakersDetailsPage } from '../speakers/speakers';
import { Calendar } from '@ionic-native/calendar';

/**
 * Generated class for the AgendaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agenda',
  templateUrl: 'agenda.html',
})
export class AgendaPage {

  agenda_days: any[] = [];
  agenda: any[] = [];
  showagenda: boolean = false;
  static_host: string = '';

  constructor(
  	public navCtrl: NavController,
  	public bcnationService: BcnationRestProvider,
  	public navParams: NavParams,
  	public loadingController:LoadingController,
  	private calendar: Calendar
  	) {
  }

  ionViewDidLoad() {
	let loading = this.loadingController.create({content : "Retrieving data, please wait..."});
	loading.present();

    this.bcnationService.getAgenda()
    .subscribe(
      (data) => { // Success
        this.static_host = data['static_host'];
        this.agenda_days = data['days'];
        this.agenda = data['agenda'];
        if(data['active']){
        	loading.dismissAll();
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
    this.navCtrl.push(SpeakersDetailsPage, { speaker: speaker, static_host: this.static_host });
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
