import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsDetailComponent } from './charts-detail.component';

describe('ChartsDetailComponent', () => {
  let component: ChartsDetailComponent;
  let fixture: ComponentFixture<ChartsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
