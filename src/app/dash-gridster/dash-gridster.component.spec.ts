import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashGridsterComponent } from './dash-gridster.component';

describe('DashGridsterComponent', () => {
  let component: DashGridsterComponent;
  let fixture: ComponentFixture<DashGridsterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashGridsterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashGridsterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
