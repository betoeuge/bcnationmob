import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the BcnationRestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BcnationRestProvider {

  url_server = 'https://www.dev.bcnation.com'

  constructor(public http: HttpClient) {
    //console.log('Hello BcnationRestProvider Provider');
  }

  getSpeakers(){
    return this.http.get(this.url_server+'/rest_api/speakers');
  }

  getSponsors(){
    return this.http.get(this.url_server+'/rest_api/sponsors');
  }

  getMedia(){
  	return this.http.get(this.url_server+'/rest_api/media'); 
  }

  getHome(){
    return this.http.get(this.url_server+'/rest_api/home');
  }

  getNews(){
  	return this.http.get(this.url_server+'/rest_api/news');
  }

  getTopSpeakers(){
   return this.http.get(this.url_server+'/rest_api/topSpeakers'); 
  }

  getTopSponsors(){
   return this.http.get(this.url_server+'/rest_api/topSponsors'); 
  }

  getTopMedia(){
   return this.http.get(this.url_server+'/rest_api/topMedia'); 
  }

  getAbout(){
   return this.http.get(this.url_server+'/rest_api/about'); 
  }

  getAgenda(){
   return this.http.get(this.url_server+'/rest_api/agenda'); 
  }

  getShop(){
   return this.http.get(this.url_server+'/rest_api/shop'); 
  }

}

