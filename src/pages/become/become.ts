import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BcnationRestProvider } from '../../providers/bcnation-rest/bcnation-rest';

@Component({
  selector: 'page-become',
  templateUrl: 'become-sponsor.html',
})
export class BecomeSponsorPage {

	sponsorForm: FormGroup;
	sponsorData = { "first_name": "", "last_name": "", "email": "", "mobile_number": "", "company": ""};

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public bcnationService: BcnationRestProvider,
  	public loadingController:LoadingController,
  	public toastCtrl: ToastController
  	) {
  	let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
  	this.sponsorForm = new FormGroup({
      first_name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(512)]),
      last_name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(512)]),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
      mobile_number: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(512)]),
      company: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(512)]),
    });
  }

  ionViewDidLoad() {

  }

  signupSponsor(){
	let loading = this.loadingController.create({content : "Sendig, please wait..."});
	loading.present();

	var json_data = this.generateData(this.sponsorData);

  	this.bcnationService.postBecomeSponsor(json_data)
    .subscribe(
      (data) => { // Success
      	loading.dismissAll();
      	this.showToast('Your submission has been received');
      },
      (error) =>{
      	loading.dismissAll();
      	this.showToast('Error');
      }
    );

  }

  generateData(sponsorData){
	let data = JSON.stringify({
		first_name: sponsorData.first_name,
		last_name: sponsorData.last_name,
		email: sponsorData.email,
		mobile_number: sponsorData.mobile_number,
		company: sponsorData.company
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
  selector: 'page-become',
  templateUrl: 'become-media.html',
})
export class BecomeMediaPage {

	sponsorForm: FormGroup;
	sponsorData = { "first_name": "", "last_name": "", "email": "", "company_website":"", "mobile_number": "", "work_phone": "", "linkedin_page": "", "company": "", "job_title": ""};

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public bcnationService: BcnationRestProvider,
  	public loadingController:LoadingController,
  	public toastCtrl: ToastController
  	) {
  	let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
  	this.sponsorForm = new FormGroup({
      first_name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(512)]),
      last_name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(512)]),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
      company_website: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(512)]),
      mobile_number: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(512)]),
      work_phone: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(512)]),
      linkedin_page: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(512)]),
      company: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(512)]),
      job_title: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(512)])
    });
  }

  ionViewDidLoad() {

  }

  signupSponsor(){
	let loading = this.loadingController.create({content : "Sendig, please wait..."});
	loading.present();

	var json_data = this.generateData(this.sponsorData);

  	this.bcnationService.postBecomeMedia(json_data)
    .subscribe(
      (data) => { // Success
      	loading.dismissAll();
      	this.showToast('Your submission has been received');
      },
      (error) =>{
      	loading.dismissAll();
      	this.showToast('Error');
      }
    );

  }

  generateData(sponsorData){
	let data = JSON.stringify({
		first_name: sponsorData.first_name,
		last_name: sponsorData.last_name,
		email: sponsorData.email,
		company_website: sponsorData.company_website,
		mobile_number: sponsorData.mobile_number,
		work_phone: sponsorData.work_phone,
		linkedin_page: sponsorData.linkedin_page,
		company: sponsorData.company,
		job_title: sponsorData.job_title
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