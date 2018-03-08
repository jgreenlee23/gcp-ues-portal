import { Component, OnInit } from '@angular/core';
import { BigQueryService } from '../bigquery.service';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  elemPositionX: 0;
  elemPositionY: 0;
  elemHeight: 0;
  elemWidth: 0;
  isMouseDown: false;
  myTimer: 0;
  mousePosX: 0;
  mousePosY: 0;

  constructor() {

  }

  ngOnInit() {

  }

  onDragStart(event: any) {
    console.log("hello world..");
    console.log(event);
    
    // TODO: stylize element being dropped
    
    // var crt = $(event.target).cloneNode(true);
    // crt.style.backgroundColor = "red";
    // crt.style.display = "none"; /* or visibility: hidden, or any of the above */
    // document.body.appendChild(crt);
    // event.dataTransfer.setDragImage($(event.target), 0, 0);
  }
  
  computeGrid() {
    // TODO: loop through grid-components in wrapper; create serialiable JSON data representing grid
  }

  onDragOver(event: any) {
    console.log(event);
    console.log("dragging over...");
    
    // event.target.css("grid-column");
    // event.target.css("grid-row");
    
    // TODO: get grid-column and grid-row from computeGrid array for event.target
    // TODO: create placeholder grid-component with dimensions (column x row) of event.target
    // TODO: remove previous grid-component (the one being dropped) to correctly show how components will be relocated
    
  }

  onDrop(event: any) {
    // event.preventDefault();
    console.log("hello drop..");
    
    // TODO: get placeholder grid-component dimensions
    // TODO: place component being dropped 
  }

  startMove() {
    var $target = $(event.target);

    // Set position mouse clicked in element for tracking //
    this.elemPositionX = event.pageX - $target.offset().left;
    this.elemPositionY = event.pageY - $target.offset().top;
    this.isMouseDown = true;

    // disable element highlighting
    $("body").children().css("user-select", "none");

    // Set margin next to sibling so open space where item will currently go //
    // if ($target.next().length) {
    //   $target.next().css("margin-left", $target.width());
    // } else {
    //   $target.prev().css("margin-left", $target.width());
    // }

    $('.wrapper').removeClass('edit');
    $target.addClass("moving");
    this.elemWidth = $target.width();
    this.elemHeight = $target.height();
    
    document.addEventListener("mouseup", this.finishMovingItem.bind(this), false);
    document.addEventListener('mousemove', this.onMouseUpdate.bind(this), false);
    document.addEventListener('mouseenter', this.onMouseUpdate.bind(this), false);
    
    this.myTimer = setInterval(function() {
      if (this.isMouseDown) {
    
        // set moving item to track mouse movement
        $('.moving').css({
          "position": "absolute",
          "left": (this.mousePosX - $(window).scrollLeft() - this.elemPositionX) + "px",
          "top": (this.mousePosY - $(window).scrollTop() - this.elemPositionY) + "px",
          "height": this.elemHeight,
          "width": this.elemWidth,
          // "box-shadow": "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"
        });
        // Set tracking over sibling elements
        // $target.siblings(".movable").on("mouseover", function(siblingEvent){
        //     var siblingMiddle = ($(this).width() + parseInt($(this).css("padding-right")) + parseInt($(this).css("padding-left")) + 2) / 2;
        // 
        //     $(this).siblings(":not('.moving')").removeAttr("style");
        //     if(siblingEvent.offsetX > siblingMiddle){
        //         self.model.set("moveItemTo", {$sibling: $(this), "position": "after"});
        //         $(this).css("margin-right", $target.width());
        //         $(this).css("margin-left", "10px");
        //     } else {
        //         self.model.set("moveItemTo", {$sibling: $(this), "position": "before"});
        //         $(this).css("margin-left", $target.width());
        //         $(this).css("margin-right", "10px");
        //     }
        // });
    
      }
    }.bind(this), 10);
  }
  
  finishMovingItem() {
    document.removeEventListener("mouseup", this.finishMovingItem, false);
    document.removeEventListener('mousemove', this.onMouseUpdate, false);
    document.removeEventListener('mouseenter', this.onMouseUpdate, false);
    clearInterval(this.myTimer);
    this.mouseDown = false;
  }

  moveItem(event: any) {
    var $target = this.model.get("$targetEl");

    // set position of moving item  based on mouse position //
    $target.css("left", (event.pageX - $(window).scrollLeft() - this.model.get("elemPositionX")) + "px");
    $target.css("top", (event.pageY - $(window).scrollTop() - this.model.get("elemPositionY")) + "px");
  },

  onMouseUpdate(e) {
      this.mousePosX = e.pageX;
      this.mousePosY = e.pageY;
  }
}
