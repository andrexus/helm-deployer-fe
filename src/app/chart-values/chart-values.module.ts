import { NgModule } from '@angular/core';
import { AppCommonModule } from '../app-common/app-common.module';
import { ChartValuesListComponent } from './chart-values-list/chart-values-list.component';
import { ChartValuesDetailComponent } from './chart-values-detail/chart-values-detail.component';
import { RouterModule } from '@angular/router';
import { ChartValuesListResolver } from '../app-common/resolvers/chart-values-list.resolver';
import { ChartValuesDetailResolver } from '../app-common/resolvers/chart-values-detail.resolver';
import { ChartsResolver } from '../app-common/resolvers/charts.resolver';

@NgModule({
  imports: [
    AppCommonModule,
    RouterModule.forChild([
      {
        path: 'chart-values',
        resolve: {
          chartValues: ChartValuesListResolver
        },
        component: ChartValuesListComponent,
      },
      {
        path: 'chart-values/add',
        component: ChartValuesDetailComponent,
        resolve: {
          charts: ChartsResolver,
        },
      },
      {
        path: 'chart-values/:id',
        resolve: {
          chartValue: ChartValuesDetailResolver,
          charts: ChartsResolver,
        },
        component: ChartValuesDetailComponent,
      },
    ]),
  ],
  declarations: [
    ChartValuesListComponent,
    ChartValuesDetailComponent,
  ],
})
export class ChartValuesModule { }
