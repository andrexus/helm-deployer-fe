import { NgModule } from '@angular/core';
import { WebHooksListResolver } from '../../app-common/resolvers/web-hooks-list.resolver';
import { WebHooksListComponent } from './web-hooks-list/web-hooks-list.component';
import { WebHooksDetailComponent } from './web-hooks-detail/web-hooks-detail.component';
import { AppCommonModule } from '../../app-common/app-common.module';
import { RouterModule } from '@angular/router';
import { WebHooksDetailResolver } from '../../app-common/resolvers/web-hooks-detail.resolver';
import { ChartValuesListResolver } from '../../app-common/resolvers/chart-values-list.resolver';
import { ReleasesListResolver } from '../../app-common/resolvers/releases-list.resolver';
import { FormsModule } from '@angular/forms';
import { ChartsResolver } from '../../app-common/resolvers/charts.resolver';

@NgModule({
  imports: [
    AppCommonModule,
    RouterModule.forChild([
      {
        path: 'web-hooks',
        resolve: {
          hooks: WebHooksListResolver,
        },
        component: WebHooksListComponent,
      },
      {
        path: 'web-hooks/add',
        resolve: {
          hooks: WebHooksListResolver,
          charts: ChartsResolver,
          chartValues: ChartValuesListResolver,
          releases: ReleasesListResolver,
        },
        component: WebHooksDetailComponent,
      },
      {
        path: 'web-hooks/:id',
        resolve: {
          hooks: WebHooksListResolver,
          hook: WebHooksDetailResolver,
          charts: ChartsResolver,
          chartValues: ChartValuesListResolver,
          releases: ReleasesListResolver,
        },
        component: WebHooksDetailComponent,
      },
    ]),
    FormsModule,
  ],
  declarations: [
    WebHooksListComponent,
    WebHooksDetailComponent,
  ],
})
export class WebHooksModule {
}
