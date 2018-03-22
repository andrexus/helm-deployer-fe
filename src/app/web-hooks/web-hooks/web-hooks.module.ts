import { NgModule } from '@angular/core';
import { WebHooksListResolver } from '../../app-common/resolvers/web-hooks-list.resolver';
import { WebHooksListComponent } from './web-hooks-list/web-hooks-list.component';
import { WebHooksDetailComponent } from './web-hooks-detail/web-hooks-detail.component';
import { AppCommonModule } from '../../app-common/app-common.module';
import { RouterModule } from '@angular/router';
import { WebHooksDetailResolver } from '../../app-common/resolvers/web-hooks-detail.resolver';
import { WebHooksResource } from './web-hooks.resource';
import { ChartValuesListResolver } from '../../app-common/resolvers/chart-values-list.resolver';
import { ChartValuesResource } from '../../chart-values/chart-values.resource';
import { ReleasesListResolver } from '../../app-common/resolvers/releases-list.resolver';
import { ReleasesResource } from '../../releases/releases.resource';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    AppCommonModule,
    RouterModule.forChild([
      {
        path: 'web-hooks',
        resolve: { data: WebHooksListResolver },
        component: WebHooksListComponent,
      },
      {
        path: 'web-hooks/add',
        resolve: {
          chartValueData: ChartValuesListResolver,
          releaseData: ReleasesListResolver,
        },
        component: WebHooksDetailComponent,
      },
      {
        path: 'web-hooks/:id',
        resolve: {
          webHookData: WebHooksDetailResolver,
          chartValueData: ChartValuesListResolver,
          releaseData: ReleasesListResolver,
        },
        component: WebHooksDetailComponent,
      },
    ]),
    FormsModule,
  ],
  providers: [
    WebHooksResource,
    WebHooksListResolver,
    WebHooksDetailResolver,
    ChartValuesResource,
    ChartValuesListResolver,
    ReleasesResource,
    ReleasesListResolver,
  ],
  declarations: [
    WebHooksListComponent,
    WebHooksDetailComponent,
  ],
})
export class WebHooksModule {
}
