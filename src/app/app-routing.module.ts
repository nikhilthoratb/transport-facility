// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRideComponent } from './components/app/components/add-ride/add-ride.component';
import { RideListComponent } from './components/app/components/ride-list/ride-list.component';
import { HomeComponent } from './components/components/home/home.component';

const routes: Routes = [
  { path: 'add-ride', component: AddRideComponent },
  { path: 'ride-list', component: RideListComponent },
    { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
