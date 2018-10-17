import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { SpeakersPage } from '../pages/speakers/speakers';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { NewsPage } from '../pages/news/news';
import { SpeakersDetailsPage } from '../pages/speakers/speakers';
import { SponsorsPage } from '../pages/sponsors/sponsors'; 
import { ShopPage } from '../pages/shop/shop'; 
import { BecomeSponsorPage } from '../pages/become/become';
import { BecomeMediaPage } from '../pages/become/become';
import { SettingsPage } from '../pages/settings/settings';
import { ViewTicketPage } from '../pages/settings/settings';
import { MenuPage } from '../pages/menu/menu';
import { AgendaPage } from '../pages/agenda/agenda';
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/login/login';
import { ForgotPage } from '../pages/login/login';
import { SignupPage } from '../pages/login/login';
import { RoomPage } from '../pages/room/room';
import { AddRoomPage } from '../pages/add-room/add-room';
import { ChatRoomPage } from '../pages/chat-room/chat-room';

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
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
const config: SocketIoConfig = {url: 'http://bcnation.ddns.net:3001', options: {} };

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    SpeakersPage,
    NewsPage,
    SpeakersDetailsPage,
    SponsorsPage,
    ShopPage,
    BecomeSponsorPage,
    BecomeMediaPage,
    SettingsPage,
    ViewTicketPage,
    MenuPage,
    AgendaPage,
    LoginPage,
    LogoutPage,
    ForgotPage,
    SignupPage,
    RoomPage,
    AddRoomPage,
    ChatRoomPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    NgxQRCodeModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    SocketIoModule.forRoot(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    SpeakersPage,
    NewsPage,
    SpeakersDetailsPage,
    SponsorsPage,
    ShopPage,
    BecomeSponsorPage,
    BecomeMediaPage,
    SettingsPage,
    ViewTicketPage,
    MenuPage,
    AgendaPage,
    LoginPage,
    LogoutPage,
    ForgotPage,
    SignupPage,
    RoomPage,
    AddRoomPage,
    ChatRoomPage
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
