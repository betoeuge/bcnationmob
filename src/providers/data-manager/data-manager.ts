import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataManagerProvider {

  private database: SQLiteObject;
  private dbReady = new BehaviorSubject<boolean>(false);

  constructor(private platform:Platform, private sqlite:SQLite) { 
	this.platform.ready().then(()=>{
      this.sqlite.create({
        name: 'bcnation.db',
        location: 'default'
      })
      .then((db:SQLiteObject)=>{
        this.database = db;
        this.createTables().then(()=>{     
          this.dbReady.next(true);
        });
      })

    });  
  }

  private createTables(){
	return this.database.executeSql(
      `CREATE TABLE IF NOT EXISTS chat_rooms (
        id INTEGER PRIMARY KEY,
        key INTEGER,
        roomname TEXT
      );`
    ,[])
    .then(()=>{
      return this.database.executeSql(
      `CREATE TABLE IF NOT EXISTS chat (
        id INTEGER PRIMARY KEY,
        chat_rooms_id INTEGER,
        type TEXT,
        username TEXT,
        message TEXT,
        send_date TEXT,
        read INTEGER,
        FOREIGN KEY(chat_rooms_id) REFERENCES chat_rooms(id)
        );`,[] )
    }).catch((err)=>console.log("error creating tables", err));
  }

  private isReady(){
	return new Promise((resolve, reject) =>{
      //if dbReady is true, resolve
      if(this.dbReady.getValue()){
        resolve();
      }
      //otherwise, wait to resolve until dbReady returns true
      else{
        this.dbReady.subscribe((ready)=>{
          if(ready){ 
            resolve(); 
          }
        });
      }  
    })
  }

  getRooms(){
	return this.isReady()
    .then(()=>{
      return this.database.executeSql("SELECT * from chat_rooms", [])
      .then((data)=>{
        let lists = [];
        for(let i=0; i<data.rows.length; i++){
          lists.push(data.rows.item(i));
        }
        return lists;
      })
    })  	
  }

  addRoom(id:number, key:number, roomname:string){
  	return this.isReady()
    .then(()=>{
      return this.database.executeSql(`INSERT INTO chat_rooms(id, key, roomname) VALUES (${id}, ${key}, '${roomname}');`, []).then((result)=>{
        if(result.id){
          return this.getRoom(result.id);
        }
      })
    });
  }
  
  getRoom(id:number){
  	return this.isReady()
    .then(()=>{
      return this.database.executeSql(`SELECT * FROM chat_rooms WHERE id = ${id}`, [])
      .then((data)=>{
        if(data.rows.length){
          return data.rows.item(0);
        }
        return null;
      })
    })
  }

  getidRooms(){
	return this.isReady()
    .then(()=>{
      return this.database.executeSql("SELECT id from chat_rooms", [])
      .then((data)=>{
        let lists = [];
        for(let i=0; i<data.rows.length; i++){
          lists.push(data.rows.item(i));
        }
        return lists;
      })
    })  	
  }
  
  deleteRoom(id:number){
  	return this.isReady()
    .then(()=>{
      return this.database.executeSql(`DELETE FROM chat_rooms WHERE id = ${id}`, [])
    })
  }

  addChat(id:number, chat_rooms_id:number, type:string, username:string, message:string, send_date:string, read:number){

  }

  addTodo(description:string, isImportant:boolean, isDone:boolean, listId:number){ }
  modifyTodo(description:string, isImportant:boolean, isDone:boolean, id:number){ }
  removeTodo(id:number){ }

}
