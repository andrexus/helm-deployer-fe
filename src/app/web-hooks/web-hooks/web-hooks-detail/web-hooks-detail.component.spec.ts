import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebHooksDetailComponent } from './web-hooks-detail.component';

describe('WebHooksDetailComponent', () => {
  let component: WebHooksDetailComponent;
  let fixture: ComponentFixture<WebHooksDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebHooksDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebHooksDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
