import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleasesDetailComponent } from './releases-detail.component';

describe('ReleasesDetailComponent', () => {
  let component: ReleasesDetailComponent;
  let fixture: ComponentFixture<ReleasesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleasesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleasesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
