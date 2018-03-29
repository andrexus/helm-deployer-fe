import { NgModule } from '@angular/core';
import { ChartsListComponent } from './charts-list/charts-list.component';
import { ChartsDetailComponent } from './charts-detail/charts-detail.component';
import { OnOfflineDatabaseOnlyGuard } from '../app-common/on-offline-database-only.guard';
import { RouterModule } from '@angular/router';
import { AppCommonModule } from '../app-common/app-common.module';
import { ChartResolver } from '../app-common/resolvers/chart.resolver';
import { ChartsResolver } from '../app-common/resolvers/charts.resolver';

@NgModule({
  imports: [
    AppCommonModule,
    RouterModule.forChild([
      {
        path: 'charts',
        resolve: {
          charts: ChartsResolver,
        },
        component: ChartsListComponent,
      },
      {
        path: 'charts/add',
        canActivate: [OnOfflineDatabaseOnlyGuard],
        component: ChartsDetailComponent,
      },
      {
        path: 'charts/:id',
        canActivate: [OnOfflineDatabaseOnlyGuard],
        resolve: {
          chart: ChartResolver,
        },
        component: ChartsDetailComponent,
      },
    ])
  ],
  declarations: [
    ChartsListComponent,
    ChartsDetailComponent,
  ]
})
export class ChartsModule {
}
