import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { BcnationRestProvider } from '../../providers/bcnation-rest/bcnation-rest';
import { Device } from '@ionic-native/device';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

	email = null;
	data:any;
	scannedCode = null;
	postHash:any;
	static_host;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	private barcodeScanner: BarcodeScanner,
  	public loadingController:LoadingController,
  	public toastCtrl: ToastController,
  	private device: Device,
  	public bcnationService: BcnationRestProvider,
  	public storage: Storage) {
  }

  ionViewDidLoad() {
  	this.getFromStorage();
  }

  openAbout(){
  	this.navCtrl.push(AboutPage);
  }

  scanCode_m(){

		this.scannedCode = '159_ff89b56f557940b9c9c40a71173d7c45';
		console.log(this.scannedCode);

		let loading = this.loadingController.create({content : "Verifiying, please wait..."});
		loading.present();
		var json_data = this.generateData(this.scannedCode);

		this.bcnationService.postRegisterDevice(json_data)
		.subscribe(
		  (data) => { // Success
		  	if(data['response']){
		  		this.storage.set('data', data['data']);
		  		this.storage.set('static_host', data['static_host']);
			  	this.email = data['data']['email'];
			  	this.data = data['data'];
			  	this.static_host = data['static_host'];
		  	}else{
		  		this.showToast('Error, make sure that you have the last ticket version');
		  	}
			loading.dismissAll();
		  },
		  (error) =>{
		  	loading.dismissAll();
		  	this.showToast('Error, make sure that you have the last ticket version');
		  }
		);

  }

  scanCode(){

    this.barcodeScanner.scan().then(barcodeData => {
		this.scannedCode = barcodeData.text;

		let loading = this.loadingController.create({content : "Verifiying, please wait..."});
		loading.present();
		var json_data = this.generateData(this.scannedCode);

		this.bcnationService.postRegisterDevice(json_data)
		.subscribe(
		  (data) => { // Success
		  	if(data['response']){
		  		this.storage.set('data', data['data']);
		  		this.storage.set('static_host', data['static_host']);
			  	this.email = data['data']['email'];
			  	this.data = data['data'];
			  	this.static_host = data['static_host'];
		  	}else{
		  		this.showToast('Error, make sure that you have the last ticket version');
		  	}
			loading.dismissAll();
		  },
		  (error) =>{
		  	loading.dismissAll();
		  	this.showToast('Error, make sure that you have the last ticket version');
		  }
		);
    }, (err) => {
        console.log('Error: ', err);
    });

  }
  getFromStorage(){
  	this.storage.get('data').then((val) => {
    	if(val){
    		this.email = val.email;
    		this.data = val;
    	}
  	});  	
  	this.storage.get('static_host').then((val) => {
    	if(val){
    		this.static_host = val;
    	}
  	});  	
  }

  viewTicket(){
  	this.navCtrl.push(ViewTicketPage, { ticket: this.data, static_host: this.static_host });
  }

  logOut(){
  	this.storage.clear();
  	this.storage.set('data', '');
  	this.email = null;
  }

  generateData(postHash){
	let data = JSON.stringify({
		ticket_hash: postHash,
		model: this.device.model,
		platform: this.device.platform,
		uuid: this.device.uuid,
		version: this.device.version,
		manufacturer: this.device.manufacturer,
		serial: this.device.serial
	});
	return data;
  }

	showToast(msg) {
		const toast = this.toastCtrl.create({
			message: msg,
			showCloseButton: true,
			closeButtonText: 'Ok'
		});
		toast.present();
	}

}

@Component({
  templateUrl: 'view-ticket.html',
})
export class ViewTicketPage {
  ticket;
  static_host;

  constructor(params: NavParams) {
    this.ticket = params.data.ticket;
    this.static_host = params.data.static_host;
  }

}

