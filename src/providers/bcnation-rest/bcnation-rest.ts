import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the BcnationRestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BcnationRestProvider {

  constructor(public http: HttpClient) {
    console.log('Hello BcnationRestProvider Provider');
  }

  getSpeakers(){
  	return this.http.get('https://www.bcnation.com/rest_api/speakers');
  }

}
