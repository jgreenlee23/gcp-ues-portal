import { Component, OnInit } from '@angular/core';
import { BigQueryService } from '../bigquery.service';
import * as html2canvas from "html2canvas";
declare var jquery: any;
declare var $: any;

// TODO: add resizing

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  elemPositionX: number = 0;
  elemPositionY: number = 0;
  elemHeight: number = 0;
  elemWidth: number = 0;
  timer: number = 0;
  mousePosX: number = 0;
  mousePosY: number = 0;
  isMouseDown: boolean = false;
  hoverElement: HTMLImageElement;
  serializedGrid: number[] = [];

  constructor() {

  }

  ngOnInit() {
    this.serializedGrid = this.computeGrid();
  }
  
  setCustomDragImage(event: any) {
    // Clone computed style of dragged element to DragImage
    var src = event.srcElement;
    var dst = event.srcElement.cloneNode(true);
    
    var computedStyle;
    if (typeof src.currentStyle != 'undefined') {
      computedStyle = src.currentStyle;
    } else {
      computedStyle = document.defaultView.getComputedStyle(src, null);
    }
    
    for (var i in computedStyle) {
      if (typeof i == "string" && i != "cssText" && !/\d/.test(i)) {
        try {
          dst.style[i] = computedStyle[i];
          if (i == "font") {
            dst.style.fontSize = computedStyle.fontSize;
          }
        } catch (e) { }
      }
    }
    
    // TODO: custom styles go here (or should be imported as JSON object)
    $(dst).addClass("dragImage");
    dst.style.backgroundColor = "blue";
    dst.style.transform = "translateX(-500px)";
    
    this.hoverElement = document.body.appendChild(dst);
    event.dataTransfer.setDragImage(dst, dst.offsetWidth / 2, dst.offsetHeight / 2);
  }

  onDrag(event: any) {
    // console.log(this.hoverElement);
    // if (this.hoverElement !== undefined) {
    //   console.log("setting drag image...");
    //   event.dataTransfer.setDragImage(this.hoverElement, 0, 0);
    // }
  }

  onDragStart(event: any) {
    this.setCustomDragImage(event);
    // TODO: remember origin point
    // TODO: stylize origin element
    // TODO: hide / remove element
  }
  
  onDragEnd(event: any) {
    
  }

  onDragOver(event: any) {
    // console.log("dragover..");

    // TODO: get grid-column and grid-row from computeGrid array for event.target
    // TODO: create placeholder grid-component with dimensions (column x row) of event.target
    // TODO: remove previous grid-component (the one being dropped) to correctly show how components will be relocated
    
  }

  onDrop(event: any) {

    
    // TODO: get placeholder grid-component dimensions
    // TODO: place component being dropped 
  }

  cleanUp(event: any) {
    $('.dragImage').remove();
  }

  computeGrid() {
    // TODO: Add component / widget reference to JSON object
    // TODO: Add save functionality (persist to MongoDB) - requires REST API Endpoint and DashboardService
    // TODO: Rewrite JQuery as Native JS
    var serialized = [];
    var children = document.querySelector('.wrapper').children;
    for (var i = 0; i < children.length; i++) {
      var child = $(children[i]);
      serialized.push({
        index: i,
        col: child.css("grid-column"),
        row: child.css("grid-row"),
        colStart: child.css("grid-column-start"),
        colEnd: child.css("grid-column-end"),
        rowStart: child.css("grid-row-start"),
        rowEnd: child.css("grid-row-end")
      });
    }
    console.log(serialized);
    return serialized;
  }

  startMove(event: any) {
    var $target = $(event.target);

    this.elemPositionX = event.pageX - $target.offset().left;
    this.elemPositionY = event.pageY - $target.offset().top;
    this.isMouseDown = true;

    // disable element highlighting
    $("body").children().css("user-select", "none");
    $('.wrapper').removeClass('edit');
    $target.addClass("moving");
    
    this.elemWidth = $target.width();
    this.elemHeight = $target.height();

    document.addEventListener("mouseup", this.finishMovingItem.bind(this), false);
    document.addEventListener('mousemove', this.onMouseUpdate.bind(this), false);
    document.addEventListener('mouseenter', this.onMouseUpdate.bind(this), false);

    this.timer = setInterval(function() {
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
    }.bind(this), 100);
  }

  finishMovingItem() {
    document.removeEventListener("mouseup", this.finishMovingItem, false);
    document.removeEventListener('mousemove', this.onMouseUpdate, false);
    document.removeEventListener('mouseenter', this.onMouseUpdate, false);
    clearInterval(this.timer);
    this.isMouseDown = false;
  }

  onMouseUpdate(e) {
    this.mousePosX = e.pageX;
    this.mousePosY = e.pageY;
    // $('.moving').css({
    //   "position": "absolute",
    //   "left": (this.mousePosX - $(window).scrollLeft() - this.elemPositionX) + "px",
    //   "top": (this.mousePosY - $(window).scrollTop() - this.elemPositionY) + "px",
    //   "height": this.elemHeight,
    //   "width": this.elemWidth,
    //   // "box-shadow": "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"
    // });
  }
  
  // html2canvas(event.toElement).then(canvas => {
  //   console.log("document successfully converted to image");
  //   var imgURL = canvas.toDataURL("image/png");
  //   var elem = document.createElement("img");
  //   elem.src = imgURL;
  //   elem.style.outline = "blue 1px solid";
  //   document.body.appendChild(elem);
  //   this.hoverElement = elem;
  //   event.dataTransfer.setDragImage(elem, 0, 0);
  // });
}
