import { Component, OnInit } from '@angular/core';
import { BigQueryService } from '../bigquery.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  datasets = [];

  constructor(private bigqueryService: BigQueryService) { }

  ngOnInit() {
    this.getDatasets();
  }

  private getDatasets() {
    // this.bigqueryService.listDatasets().subscribe(datasets => this.datasets = datasets);
    // console.log(this.datasets);
  }
}
