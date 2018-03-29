import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { environment } from '../../environments/environment';

@Directive({
  selector: '[onOfflineDatabaseOnly]'
})
export class OnOfflineDatabaseOnlyDirective implements OnInit {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) { }

  ngOnInit() {
    if (environment.offline) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

}
