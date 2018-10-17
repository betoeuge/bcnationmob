import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { BcnationRestProvider } from '../../providers/bcnation-rest/bcnation-rest';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@IonicPage({name: 'Support'})
@Component({
  selector: 'page-support',
  templateUrl: 'support.html',
})
export class SupportPage {

	supportForm: FormGroup;
	supportData = { "first_name": "", "last_name": "", "email": "", "comments": ""};

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public bcnationService: BcnationRestProvider,
  	public loadingController:LoadingController,
  	public toastCtrl: ToastController) {
	  	let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
	  	this.supportForm = new FormGroup({
			first_name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(512)]),
			last_name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(512)]),
			email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
			comments: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(512)])
	    });
  }

  ionViewDidLoad() {
    
  }

    sendRequest(){
	let loading = this.loadingController.create({content : "Sending, please wait..."});
	loading.present();

	var json_data = this.generateData(this.supportData);

  	this.bcnationService.postSupport(json_data)
    .subscribe(
      (data) => { // Success
        loading.dismissAll();
      	if(data['response']){
          this.showToast('Your submission has been received');
      	}else{
          this.showToast('Error');
      	}
      },
      (error) =>{
      	loading.dismissAll();
      	this.showToast('Error');
      }
    );

  }

  generateData(supportData){
	let data = JSON.stringify({
		first_name: supportData.first_name,
		last_name: supportData.last_name,
		email: supportData.email,
		comments: supportData.comments
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
