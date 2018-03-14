import { NgModule } from '@angular/core';
import { WebHooksListResolver } from './web-hooks-list/web-hooks-list.resolver';
import { WebHooksListComponent } from './web-hooks-list/web-hooks-list.component';
import { WebHooksDetailComponent } from './web-hooks-detail/web-hooks-detail.component';
import { AppCommonModule } from '../../app-common/app-common.module';
import { RouterModule } from '@angular/router';
import { WebHooksDetailResolver } from './web-hooks-detail/web-hooks-detail.resolver';
import { WebHooksResource } from './web-hooks.resource';

@NgModule({
  imports: [
    AppCommonModule,
    RouterModule.forChild([
      {
        path: 'web-hooks',
        resolve: {data: WebHooksListResolver},
        component: WebHooksListComponent,
      },
      {
        path: 'web-hooks/add',
        component: WebHooksDetailComponent,
      },
      {
        path: 'web-hooks/:id',
        resolve: {data: WebHooksDetailResolver},
        component: WebHooksDetailComponent,
      },
    ]),
  ],
  providers: [
    WebHooksResource,
    WebHooksListResolver,
    WebHooksDetailResolver,
  ],
  declarations: [
    WebHooksListComponent,
    WebHooksDetailComponent,
  ],
})
export class WebHooksModule {
}
