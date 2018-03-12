import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartValuesDetailComponent } from './chart-values-detail.component';

describe('ChartValuesDetailComponent', () => {
  let component: ChartValuesDetailComponent;
  let fixture: ComponentFixture<ChartValuesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartValuesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartValuesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
