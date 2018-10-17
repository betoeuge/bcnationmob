import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, Events } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BcnationRestProvider } from '../../providers/bcnation-rest/bcnation-rest';
import { DataProvider } from '../../providers/data/data';
import { MenuPage } from '../menu/menu';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	login: any[] = [];
	loginForm: FormGroup;
	loginData = { "email": "", "password": ""};

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
    public bcnationService: BcnationRestProvider,
  	public dataService: DataProvider,
  	public loadingController:LoadingController,
  	public toastCtrl: ToastController,
    public events: Events
	) {
	  	let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
	  	this.loginForm = new FormGroup({
	      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
	      password: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(512)])
	    });
  	}

  ionViewDidLoad() {
	let loading = this.loadingController.create({content : "Wait..."});
	loading.present();

    this.bcnationService.getLogin()
    .subscribe(
      (data) => { // Success
      	loading.dismissAll();
        this.login = data['login'];
      },
      (error) =>{
        loading.dismissAll();
        this.showToast("Error");
        //console.error(error); 
      }
    )
  }

  logIn(){

	let loading = this.loadingController.create({content : "Verifiying, please wait..."});
	loading.present();

	var json_data = this.generateData(this.loginData);

  	this.bcnationService.postLogin(json_data)
    .subscribe(
      (data) => { // Success
        loading.dismissAll();
      	if(data['response']){
          this.dataService.set_data(data['data']);
          this.events.publish('user:login', data['data']);
          this.navCtrl.setRoot(MenuPage)
      	}else{
  		  	this.showToast('Login or password invalid');
      	}
      },
      (error) =>{
      	loading.dismissAll();
      	this.showToast('Error');
      }
    );

  }

  generateData(loginData){
	let data = JSON.stringify({
		email: loginData.email,
		password: loginData.password
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

	forgot(){
		this.navCtrl.push(ForgotPage);
	}

	signup(){
		this.navCtrl.push(SignupPage);
	}
}

@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html',
})
export class ForgotPage {

	login: any[] = [];
	loginForm: FormGroup;
	loginData = { "email": ""};

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public bcnationService: BcnationRestProvider,
  	public loadingController:LoadingController,
  	public toastCtrl: ToastController
	) {
	  	let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
	  	this.loginForm = new FormGroup({
	      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
	    });
  	}

  ionViewDidLoad() {
  }

  sendEmail(){
	let loading = this.loadingController.create({content : "Verifiying, please wait..."});
	loading.present();

	var json_data = this.generateData(this.loginData);

  	this.bcnationService.postReset(json_data)
    .subscribe(
      (data) => { // Success
      	loading.dismissAll();
      	if(data['response']){
      		this.showToast('You will receive an email with the instructions to reset your passsword shortly');
      	}else{
		  	  this.showToast('Email not registered');
      	}
      },
      (error) =>{
      	loading.dismissAll();
      	this.showToast('Error');
      }
    );

  }

  generateData(loginData){
	let data = JSON.stringify({
		email: loginData.email
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
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

	login: any[] = [];
	loginForm: FormGroup;
	loginData = { "first_name": "", "last_name": "", "email": "", "password": ""};

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public bcnationService: BcnationRestProvider,
  	public loadingController:LoadingController,
  	public toastCtrl: ToastController
	) {
	  	let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
	  	this.loginForm = new FormGroup({
			first_name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(512)]),
			last_name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(512)]),
			email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
			password: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(512)])
	    });
  	}

  ionViewDidLoad() {

  }

  signUp(){
	let loading = this.loadingController.create({content : "Verifiying, please wait..."});
	loading.present();

	var json_data = this.generateData(this.loginData);

  	this.bcnationService.postSignup(json_data)
    .subscribe(
      (data) => { // Success
        loading.dismissAll();
      	if(data['response']){
          this.showToast('Data saved');
      	}else{
          this.showToast('Email already registered');
      	}
      },
      (error) =>{
      	loading.dismissAll();
      	this.showToast('Error');
      }
    );

  }

  generateData(loginData){
	let data = JSON.stringify({
		first_name: loginData.first_name,
		last_name: loginData.last_name,
		email: loginData.email,
		password: loginData.password
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
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public dataService: DataProvider,
    public events: Events
    ) {

    this.dataService.clear_data();
    this.events.publish('user:logout');
    this.navCtrl.setRoot(MenuPage);

  }

  ionViewDidLoad() {

  }

}