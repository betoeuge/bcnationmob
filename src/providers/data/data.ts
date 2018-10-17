import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class DataProvider {

  constructor(public storage: Storage) {
    
  }

  set_data(data){
    return this.storage.set('data', data)
    .then(()=>{
      this.storage.get('data')
      .then((val)=>{
        return val;
      })
    })
  }

  set_static_host(host){
    return this.storage.set('static_host', host)
    .then(()=>{
      this.storage.get('static_host')
      .then((val)=>{
        return val;
      })
    })
  }

  get_data(){
    return this.storage.get('data')
    .then((val)=>{
      return val;
    })
  }

  clear_data(){
    this.storage.clear();
  }



}
