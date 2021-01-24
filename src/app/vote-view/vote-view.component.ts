import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from './../services/database.service';
import { Observable } from 'rxjs';
import { Pool } from './../../interfaces';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-vote-view',
  templateUrl: './vote-view.component.html',
  styleUrls: ['./vote-view.component.scss']
})
export class VoteViewComponent implements OnInit {

  @ViewChildren('check') checkboxes: QueryList<ElementRef<HTMLInputElement>>
  pool$: Observable<Pool>
  multipleSelection: boolean
  poolId: string
  constructor(
    private databaseSv: DatabaseService,
    private route: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.poolId = this.route.snapshot.params['id']
    this.pool$ = this.databaseSv.getPool(this.poolId)
    this.pool$.pipe(take(1)).subscribe(pool => this.multipleSelection = pool.multipleSelection)
  }


  optionClick(e) {
    let li: HTMLLIElement = e.target
    let checkbox = li.querySelector('input')

    if (!this.multipleSelection)
      this.checkboxes.forEach((el) => {
        if (el.nativeElement != checkbox) {
          el.nativeElement.checked = false
        }
      })

    checkbox.checked = !checkbox.checked
  }
  updateVotes() {
    let votes: number[] = []

    this.checkboxes.forEach((el, i) => {
      if (el.nativeElement.checked) {
        votes.push(i)
      }
    })

    localStorage.setItem(this.poolId, 'true')
    this.databaseSv.updateVotes(this.poolId, votes)
      .then(() => this.router.navigateByUrl('/r/' + this.poolId))
      .catch(console.log)
  }

}
