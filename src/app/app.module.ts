import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddRideComponent } from './components/app/components/add-ride/add-ride.component';
import { RideListComponent } from './components/app/components/ride-list/ride-list.component';
import { HomeComponent } from './components/components/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    AddRideComponent,
    RideListComponent,
    HomeComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
