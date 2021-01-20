import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { PoolViewComponent } from './pool-view/pool-view.component';


const routes: Routes = [
  {
    path: "",
    pathMatch: 'full',
    component: HomeScreenComponent
  },
  {
    path: ":id",
    pathMatch: 'full',
    component: PoolViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
