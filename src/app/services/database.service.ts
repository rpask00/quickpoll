import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Pool } from '../../interfaces';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    private afdb: AngularFireDatabase
  ) { }


  submitPool(pool: Pool): string {
    let ref = this.afdb.list('pools').push(pool) as any
    let path: string[] = ref.path.pieces_
    return path[path.length - 1]
  }

  getPool(id: string): Observable<any> {
    return this.afdb.object('pools/' + id).valueChanges()
  }


  updateVotes(id: string, votesindexes: number[]): void {
    this.afdb.object('pools/' + id + '/votes').valueChanges().pipe(take(1)).subscribe(votes => {
      votesindexes.forEach(vi => votes[vi]++)
      this.afdb.object('pools/' + id + '/votes').set(votes)
    })
  }

}



