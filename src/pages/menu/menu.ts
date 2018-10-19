import { Component, ViewChild } from '@angular/core';
import { NavController, Nav, Events } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { LogoutPage } from '../login/login';
import { DataProvider } from '../../providers/data/data';

export interface PageInterface {
  title: string;
  pageName: any;
  tabComponent?: any;
  index?: number;
  icon: string;
  showLogin: boolean;
  showLogout: boolean;
}


@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  // Basic root for our content view
  rootPage = 'TabsPage';
  email = null;
  first_name = null;
  last_name = null;
 
  // Reference to the app's root nav
  @ViewChild(Nav) nav: Nav;
 
  pages: PageInterface[] = [
    { title: 'Home', pageName: 'TabsPage', tabComponent: 'HomePage', index: 0, icon: 'home', showLogin: true, showLogout: true },
    { title: 'Profile ', pageName: 'Profile', icon: 'contact', showLogin: true, showLogout: false },
    { title: 'Inbox ', pageName: 'Inbox', icon: 'mail', showLogin: true, showLogout: true },
    { title: 'Friends ', pageName: 'Friends', icon: 'contacts', showLogin: true, showLogout: false },
    { title: 'Chat ', pageName: 'Chat', icon: 'chatboxes', showLogin: true, showLogout: false },
    { title: 'Support ', pageName: 'Support', icon: 'hammer', showLogin: true, showLogout: true },
    { title: 'Login ', pageName: LoginPage, icon: 'log-in', showLogin: false, showLogout: true },
    { title: 'Logout ', pageName: LogoutPage, icon: 'log-out', showLogin: true, showLogout: false },
  ];
 
  constructor(public navCtrl: NavController, 
    public dataService: DataProvider,
    public events: Events) {
      events.subscribe('user:login', (val) => {
        this.email = val.email;
        this.first_name = val.first_name;
        this.last_name = val.last_name;        
      });
      events.subscribe('user:logout', () => {
        this.email = null;
        this.first_name = null;
        this.last_name = null;        
      });
   }

   ionViewDidLoad(){
    this.dataService.get_data().then((val) => {
      if(val){
        this.email = val.email;
        this.first_name = val.first_name;
        this.last_name = val.last_name;
      }else{
        this.email = null;
        this.first_name = null;
        this.last_name = null;        
      }
    });
   }

  openPage(page: PageInterface) {
    let params = {};
 
    // The index is equal to the order of our tabs inside tabs.ts
    if (page.index) {
      params = { tabIndex: page.index };
    }
 
    // The active child nav is our Tabs Navigation
    if (this.nav.getActiveChildNav() && page.index != undefined) {
      this.nav.getActiveChildNav().select(page.index);
    } else {
      // Tabs are not active, so reset the root page 
      // In this case: moving to or from SpecialPage
      this.nav.setRoot(page.pageName, params);
    }
  }

  showPage(showLogin, showLogout){
    let show : boolean;
    if(!this.email){
      show = showLogout;
    }else{
      show = showLogin 
    }
    return show;
  }

 
}