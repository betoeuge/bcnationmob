import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BcnationRestProvider {

  url_server = 'https://bcnation.ddns.net';
  url_server_chat = 'http://bcnation.ddns.net:3001';

  constructor(public http: HttpClient) {
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

  getLogin(){
   return this.http.get(this.url_server+'/rest_api/login'); 
  }

  postBecomeSponsor(post){
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url_server+'/rest_api/becomeSponsor', post, {headers:headers}); 
  }

  postBecomeMedia(post){
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url_server+'/rest_api/becomeMedia', post, {headers:headers}); 
  }

  postRegisterDevice(post){
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url_server+'/rest_api/registerDevice', post, {headers:headers}); 
  }

  postLogin(post){
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url_server+'/rest_api/verifyLogin', post, {headers:headers}); 
  }

  postReset(post){
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url_server+'/rest_api/resetPassword', post, {headers:headers}); 
  }

  postSignup(post){
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url_server+'/rest_api/signUp', post, {headers:headers}); 
  }

  postSupport(post){
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url_server+'/rest_api/support', post, {headers:headers}); 
  }

  getRooms(post){
    return this.http.get(this.url_server_chat+'/rooms?nickname='+post.nickname);
  }

  getChatRoom(post){
    return this.http.get(this.url_server_chat+'/chat_room?roomkey='+post.roomkey);
  }
}

