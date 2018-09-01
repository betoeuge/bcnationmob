import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

	private newsUrl: string = "https://www.cryptoworldjournal.com/feed/";

  constructor(public http: HttpClient) {
    
  }

  public getNews() {
    
    return this
      .http
      .get(this.newsUrl, { responseType: "text" });

  }

}
