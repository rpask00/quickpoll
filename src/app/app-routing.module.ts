import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VoteGuardGuard } from './guards/vote-guard.guard';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { PoolViewComponent } from './pool-view/pool-view.component';
import { VoteViewComponent } from './vote-view/vote-view.component';


const routes: Routes = [
  {
    path: "",
    pathMatch: 'full',
    component: HomeScreenComponent
  },
  {
    path: "r/:id",
    pathMatch: 'full',
    component: PoolViewComponent
  },
  {
    path: "v/:id",
    pathMatch: 'full',
    component: VoteViewComponent,
    canActivate: [VoteGuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
