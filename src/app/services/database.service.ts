import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Pool } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    private afdb: AngularFireDatabase
  ) { }


  submitPool(pool: Pool) {
    this.afdb.list('pools').push(pool)
  }
}
