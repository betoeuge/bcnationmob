import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the DataManagerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataManagerProvider {

	db: SQLiteObject = null;

  constructor(
  	public http: HttpClient) {
  }

	setDatabase(db: SQLiteObject){
		if(this.db === null){
			this.db = db;
		}
	}

  	dropTableTicket(){
  		let sql = 'DROP TABLE ticket';
  		this.db.executeSql(sql, [])
		.then(() => console.log('Executed SQL'))
		.catch(e => console.log(e));
  	}

	createTableTicket(){
		let sql = 'CREATE TABLE IF NOT EXISTS ticket(id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT, last_name TEXT, email TEXT, ticket_type TEXT, logo TEXT, date TEXT, location TEXT, ticket_hash TEXT)';
		return this.db.executeSql(sql, [])
		.then(() => console.log('Table creada'))
		.catch(e => console.log(e));
	}

	insertTicket(ticket: any){
		let sql = 'INSERT INTO ticket(first_name, last_name, email, ticket_type, logo, date, location, ticket_hash)';
			sql += ' VALUES(?,?,?,?,?,?,?,?)';
		return this.db.executeSql(sql, [ticket.first_name, ticket.last_name, ticket.email, ticket.ticket_type, ticket.logo, ticket.date, ticket.location, ticket.ticket_hash])
		.then(() => console.log('Registro insertado'))
		.catch(e => console.log(e));
	}

	getTicket(){
	    let sql = 'SELECT * FROM ticket';
	    return this.db.executeSql(sql, [])
	    .then(response => {
	      let ticket = [];
	      for (let index = 0; index < response.rows.length; index++) {
	        ticket.push( response.rows.item(index) );
	      }
	      console.log('select ticket');
	      return Promise.resolve( ticket );
	    })
	    .catch(error => Promise.reject(error));
	}

}
