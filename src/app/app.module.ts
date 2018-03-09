import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { BigQueryService } from './bigquery.service';
import { DashGridsterComponent } from './dash-gridster/dash-gridster.component';
import { GridsterModule } from 'angular2gridster';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DashGridsterComponent
  ],
  imports: [
    BrowserModule,
    GridsterModule
  ],
  providers: [BigQueryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
