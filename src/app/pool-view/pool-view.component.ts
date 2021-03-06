import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pool } from './../../interfaces';
import { DatabaseService } from './../services/database.service';
import { Observable, Subscription } from 'rxjs';
import { Chart } from 'chart.js';
import { ThrowStmt } from '@angular/compiler';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-pool-view',
  templateUrl: './pool-view.component.html',
  styleUrls: ['./pool-view.component.scss']
})
export class PoolViewComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('ctx') ctx: ElementRef;
  pool$: Observable<Pool>
  poolTitle: string
  chart: Chart
  poolSubscription: Subscription

  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          stepSize: 1
        }
      }]
    }
  };
  barChartLabels = []
  barChartType = 'bar';
  barChartLegend = false;
  barChartData = []

  constructor(
    private router: ActivatedRoute,
    private databaseSv: DatabaseService
  ) { }

  ngOnInit(): void {


  }

  ngAfterViewInit(): void {
    this.chart = new Chart(this.ctx.nativeElement, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'votes',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          backgroundColor: [
            'rgba(255, 99, 132, 0.4)',
            'rgba(54, 162, 235, 0.4)',
            'rgba(255, 206, 86, 0.4)',
            'rgba(75, 192, 192, 0.4)',
            'rgba(153, 102, 255, 0.4)',
            'rgba(255, 159, 64, 0.4)',
            'rgba(0, 141, 94,0.4)',
            'rgba(166, 6, 230,0.4)',
            'rgba(223, 0, 22,0.4)',
            'rgba(0, 163, 223,0.4)',
            'rgba(251, 255, 0,0.4)',
            'rgba(191, 108, 0,0.4)',
            'rgba(57, 0, 191,0.4)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(0, 141, 94, 1)',
            'rgba(166, 6, 230, 1)',
            'rgba(223, 0, 22, 1)',
            'rgba(0, 163, 223, 1)',
            'rgba(251, 255, 0, 1)',
            'rgba(191, 108, 0, 1)',
            'rgba(57, 0, 191,1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              stepSize: 1
            }
          }]
        },
        legend: {
          display: false
        }
      },
    });

    let poolId = this.router.snapshot.params['id']
    this.pool$ = this.databaseSv.getPool(poolId)
    this.pool$.pipe(take(1)).subscribe(pool => {

      if (!pool) return
      this.poolTitle = pool.title

      this.chart.data.labels = pool.labels
      this.chart.data.datasets[0].data = pool.votes
      this.chart.update()


      this.poolSubscription = this.pool$.subscribe(pool => {
        this.chart.data.datasets[0].data = pool.votes
        this.chart.update()
      })
    })

  }
  ngOnDestroy() {
    this.poolSubscription.unsubscribe()
  }
}