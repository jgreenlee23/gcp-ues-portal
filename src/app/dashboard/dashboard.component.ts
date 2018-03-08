import { Component, OnInit } from '@angular/core';
import { BigQueryService } from '../bigquery.service';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  constructor() {
    
  }
  
  ngOnInit() {
    // this.getDatasets();
    // $('.wrapper > div').resizable();
    // var element = document.getElementById('element');
    // var resizer = document.createElement('div');
    // resizer.className = 'resizer';
    // resizer.style.width = '10px';
    // resizer.style.height = '10px';
    // resizer.style.background = 'red';
    // resizer.style.position = 'absolute';
    // resizer.style.right = 0;
    // resizer.style.bottom = 0;
    // resizer.style.cursor = 'se-resize';
    // element.appendChild(resizer);
    // resizer.addEventListener('mousedown', initResize, false);
  }
  
  onDragStart(event: any) {
    // event.dataTransfer.setData('data', data);
    console.log("hello world..");
  }
  
  onDragOver(event: any) {
    console.log(event);
    console.log("dragging over...");
  }
  
  onDrop(event: any) {
    // let dataTransfer = event.dataTransfer.getData('data');
    // event.preventDefault();
    console.log("hello drop..");
  }
  
  onClickMe(event: any) {
    console.log("testing...");
  }

  // initResize(event: any) {
  //    window.addEventListener('mousemove', Resize, false);
  //    window.addEventListener('mouseup', stopResize, false);
  // }
  // resize(event: any) {
  //    element.style.width = (e.clientX - element.offsetLeft) + 'px';
  //    element.style.height = (e.clientY - element.offsetTop) + 'px';
  // }
  // stopResize(event: any) {
  //     window.removeEventListener('mousemove', Resize, false);
  //     window.removeEventListener('mouseup', stopResize, false);
  // }
}
