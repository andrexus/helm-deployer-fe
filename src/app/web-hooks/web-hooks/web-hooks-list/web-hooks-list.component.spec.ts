import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebHooksListComponent } from './web-hooks-list.component';

describe('WebHooksListComponent', () => {
  let component: WebHooksListComponent;
  let fixture: ComponentFixture<WebHooksListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebHooksListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebHooksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
