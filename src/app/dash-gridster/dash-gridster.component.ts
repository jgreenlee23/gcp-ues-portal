import { Component, OnInit } from '@angular/core';
// import { GridsterComponent } from 'angular2gridster';
import { GridsterComponent } from 'angular2gridster/src/gridster.component';
import { IGridsterOptions } from 'angular2gridster/src/IGridsterOptions';
import { IGridsterDraggableOptions } from 'angular2gridster/src/IGridsterDraggableOptions';

@Component({
  selector: 'dash-gridster',
  templateUrl: './dash-gridster.component.html',
  styleUrls: ['./dash-gridster.component.scss']
})
export class DashGridsterComponent implements OnInit {

  ngOnInit() {
  }

  widgets: Array<any> = [
    {
      // x: 0, y: 0, w: 1, h: 2,
      dragAndDrop: true,
      resizable: true,
      title: 'Basic form inputs 1'
    },
    {
      // x: 1, y: 0, w: 3, h: 1,
      dragAndDrop: true,
      resizable: true,
      title: 'Basic form inputs 2'
    },
    {
      // x: 1, y: 1, w: 2, h: 1,
      dragAndDrop: true,
      resizable: true,
      title: 'Basic form inputs 3'
    },
    {
      // x: 3, y: 1, w: 1, h: 2,
      dragAndDrop: true,
      resizable: true,
      title: 'Basic form inputs 4'
    },
    {
      // w: 1, h: 2,
      dragAndDrop: true,
      resizable: true,
      title: 'Basic form inputs x'
    }
  ];
  gridsterOptions = {
    lanes: 2,
    direction: 'vertical',
    floating: false,
    dragAndDrop: true,
    resizable: true,
    useCSSTransforms: true,
    responsiveOptions: [
      {
        breakpoint: 'sm',
        lanes: 3
      },
      {
        breakpoint: 'md',
        minWidth: 768,
        lanes: 4,
        dragAndDrop: true,
        resizable: true
      },
      {
        breakpoint: 'lg',
        lanes: 6,
        dragAndDrop: true,
        resizable: true
      },
      {
        breakpoint: 'xl',
        minWidth: 1800,
        lanes: 8,
        dragAndDrop: true,
        resizable: true
      }
    ]
  };


  addWidgetFromDrag(gridster: GridsterComponent, event: any) {
    const item = event.item;
    const breakpoint = gridster.options.breakpoint;
    const widget = {
      w: item.w, h: item.h,
      dragAndDrop: true,
      resizable: true,
      title: 'New widget'
    };

    // widget[AppComponent.X_PROPERTY_MAP[breakpoint]] = item.x;
    // widget[AppComponent.Y_PROPERTY_MAP[breakpoint]] = item.y;

    this.widgets.push(widget);

    console.log('add widget from drag to:', gridster);
  }

  over(event) {
    const size = event.item.calculateSize(event.gridster);

    event.item.itemPrototype.$element.querySelector('.gridster-item-inner').style.width = size.width + 'px';
    event.item.itemPrototype.$element.querySelector('.gridster-item-inner').style.height = size.height + 'px';
    event.item.itemPrototype.$element.classList.add('is-over');
  }

  out(event) {
    event.item.itemPrototype.$element.querySelector('.gridster-item-inner').style.width = '';
    event.item.itemPrototype.$element.querySelector('.gridster-item-inner').style.height = '';
    event.item.itemPrototype.$element.classList.remove('is-over');
  }

  addWidgetWithoutData() {
    this.widgets.push({
      title: 'Basic form inputs X',
      dragAndDrop: true,
      resizable: true,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ' +
        'dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ' +
        'commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla ' +
        'pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est ' +
        'laborum.'
    });
  }

  addWidget(gridster: GridsterComponent) {
    this.widgets.push({
      x: 4, y: 0, w: 1, h: 1,
      dragAndDrop: true,
      resizable: true,
      title: 'Basic form inputs 5',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ' +
        'dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ' +
        'commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla ' +
        'pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est ' +
        'laborum.'
    });
    console.log('widget push', this.widgets[this.widgets.length - 1]);
  }

  remove($event, index: number, gridster: GridsterComponent) {
    $event.preventDefault();
    this.widgets.splice(index, 1);
    console.log('widget remove', index);
  }

  removeAllWidgets() {
    this.widgets = [];
  }

  itemChange($event: any, gridster) {
    console.log('item change', $event);
  }
}
