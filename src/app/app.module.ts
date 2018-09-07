import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
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

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Calendar } from '@ionic-native/calendar';

import { HttpClientModule } from '@angular/common/http';
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
    BecomeMediaPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
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
    BecomeMediaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BcnationRestProvider,
    TransformProvider,
    DataProvider,
    InAppBrowser,
    Calendar
  ]
})
export class AppModule {}
