import { Component, OnInit } from '@angular/core';
declare var jquery: any;
declare var $: any;

// TODO: add resizing

type GridCoord = {
  i: number;
  x: number;
  y: number;
  w: number;
  h: number;
};

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  hoverElement: HTMLImageElement;
  serializedGrid: GridCoord[];
  trackWidth: number = 0;
  trackHeight: number = 0;
  colgutter: number = 0;
  rowgutter: number = 0;
  containerRect: ClientRect;
  placeholderElem: HTMLDivElement;
  originElem: Element;

  constructor() {

  }

  ngOnInit() {
    this.computeGrid();
    this.computeFixedGrid();
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
    // dst.style.backgroundColor = "blue";
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
    $(event.srcElement).attr('style', 'visibility: hidden');
    this.originElem = event.srcElement;
    this.setCustomDragImage(event);
    
    // TODO: remember origin point
    // TODO: stylize origin element
    // TODO: hide / remove element
  }
  
  onDragEnd(event: any) {
    console.log("dragend...");
    var attrs = this.getGridAttributes(this.placeholderElem);
    var obj = document.createElement('div');
    var arr = new Array();
    for (var key in attrs) {
      if (key != "i") {
        arr.push(key + ':' + attrs[key]);
      }
    }
    
    obj.setAttribute('style', arr.join(';'));
    this.placeholderElem.parentNode.removeChild(this.placeholderElem);
    this.placeholderElem = null;
    $(obj).appendTo('.wrapper');
    // event.preventDefault();
    
  }

  onDragOver(event: any) {
    console.log("dragover..");
    event = event || window.event;
    var dragX = event.pageX, dragY = event.pageY;
    
    var x = Math.floor((dragX - this.containerRect.left) / (this.trackWidth + this.colgutter)); 
    var y = Math.floor(((dragY - this.containerRect.top) / (this.trackHeight + this.rowgutter) * 100));
    
    if (this.placeholderElem == undefined) {
      var attrs = this.getGridAttributes(this.originElem);
      var obj = document.createElement('div');
      var arr = new Array();
      for (var key in attrs) {
        if (key != "i") {
          arr.push(key + ':' + attrs[key]);
        }
      }
      
      obj.setAttribute('style', arr.join(';'));
      $(obj).appendTo('.wrapper');
      this.placeholderElem = obj;
      this.placeholderElem.style['background-color'] = 'lightgrey';
      
    } else {
      var index = Array.from(document.querySelector('.wrapper').children).indexOf(this.originElem);
      console.log(this.serializedGrid[index]);
      this.placeholderElem.style['grid-column-start'] = x + 1;
      this.placeholderElem.style['grid-column-end'] = x + 1 + this.serializedGrid[index].w;
      this.placeholderElem.style['grid-row-start'] = y + 1;
      this.placeholderElem.style['grid-row-end'] = y + 1 + this.serializedGrid[index].h;
    }
  }

  onDrop(event: any) {

  }

  cleanUp(event: any) {
    console.log("mouseup");
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
  
  computeFixedGrid() {
    var serialized = [];

    // calculate container size
    var wrap = document.getElementById('wrapper');
    var rect = wrap.getBoundingClientRect();
    var colgutter = getComputedStyle(wrap)['grid-column-gap'].slice(0, -2);
    var rowgutter = getComputedStyle(wrap)['grid-row-gap'].slice(0, -2);

    // calculate track size
    var firstChild = $(wrap).children()[0];
    var rec2 = firstChild.getBoundingClientRect();
    var attrs = this.getGridAttributes(firstChild);
    var trackWidth = 0, trackHeight = 0;
    
    if (attrs.colStart == "auto" || attrs.colEnd == "auto") {
      trackHeight = rec2.height;
    } else {
      trackHeight = rec2.height / (attrs.colEnd - attrs.colStart);
    }
    
    if (attrs.rowStart == "auto" || attrs.rowEnd == "auto") {
      trackWidth = rec2.width;
    } else {
      trackWidth = rec2.width / (attrs.rowEnd - attrs.rowStart);
    }
    
    var children = document.querySelector('.wrapper').children;
    for (var i = 0; i < children.length; i++) {
      var childRect = children[i].getBoundingClientRect();
      serialized.push({
        i: i,
        x: Math.floor((childRect.left - rect.left) / (trackWidth + colgutter)),
        y: Math.floor(((childRect.top - rect.top) / (trackHeight + rowgutter) * 100)),
        h: Math.floor(childRect.height / trackHeight),
        w: Math.floor(childRect.width / trackWidth)
      });
    }
    
    console.log(serialized);
    this.serializedGrid = serialized;
    this.trackWidth = trackWidth;
    this.trackHeight = trackHeight;
    this.colgutter = colgutter;
    this.rowgutter = rowgutter;
    this.containerRect = rect;
  }
  
  getGridAttributes(elem: Element) {
    return {
      col: getComputedStyle(elem)["grid-column"],
      row: getComputedStyle(elem)["grid-row"],
      colStart: getComputedStyle(elem)["grid-column-start"],
      colEnd: getComputedStyle(elem)["grid-column-end"],
      rowStart: getComputedStyle(elem)["grid-row-start"],
      rowEnd: getComputedStyle(elem)["grid-row-end"],
    }
  }
}
