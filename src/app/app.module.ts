import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, Platform } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { SpeakersPage } from '../pages/speakers/speakers';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';
import { NewsPage } from '../pages/news/news';
import { SpeakersDetailsPage } from '../pages/speakers/speakers';
import { SponsorsPage } from '../pages/sponsors/sponsors'; 
import { ShopPage } from '../pages/shop/shop'; 
import { BecomeSponsorPage } from '../pages/become/become';
import { BecomeMediaPage } from '../pages/become/become';
import { SettingsPage } from '../pages/settings/settings';
import { ViewTicketPage } from '../pages/settings/settings';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Calendar } from '@ionic-native/calendar';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Device } from '@ionic-native/device';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { SQLite } from '@ionic-native/sqlite';

import { BcnationRestProvider } from '../providers/bcnation-rest/bcnation-rest';
import { TransformProvider } from '../providers/transform/transform';
import { DataProvider } from '../providers/data/data';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    SpeakersPage,
    TabsPage,
    NewsPage,
    SpeakersDetailsPage,
    SponsorsPage,
    ShopPage,
    BecomeSponsorPage,
    BecomeMediaPage,
    SettingsPage,
    ViewTicketPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    NgxQRCodeModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    SpeakersPage,
    TabsPage,
    NewsPage,
    SpeakersDetailsPage,
    SponsorsPage,
    ShopPage,
    BecomeSponsorPage,
    BecomeMediaPage,
    SettingsPage,
    ViewTicketPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BcnationRestProvider,
    TransformProvider,
    DataProvider,
    InAppBrowser,
    Calendar,
    BarcodeScanner,
    Device,
    SQLite
  ]
})
export class AppModule {

  constructor(){
  }

}
