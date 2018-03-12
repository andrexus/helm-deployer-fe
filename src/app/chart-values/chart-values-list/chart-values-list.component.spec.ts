import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartValuesListComponent } from './chart-values-list.component';

describe('ChartValuesListComponent', () => {
  let component: ChartValuesListComponent;
  let fixture: ComponentFixture<ChartValuesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartValuesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartValuesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
