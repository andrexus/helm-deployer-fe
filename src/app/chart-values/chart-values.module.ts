import { NgModule } from '@angular/core';
import { AppCommonModule } from '../app-common/app-common.module';
import { ChartValuesListComponent } from './chart-values-list/chart-values-list.component';
import { ChartValuesDetailComponent } from './chart-values-detail/chart-values-detail.component';
import { RouterModule } from '@angular/router';
import { ChartValuesResource } from './chart-values.resource';
import { ChartValuesListResolver } from './chart-values-list/chart-values-list.resolver';
import { ChartValuesDetailResolver } from './chart-values-detail/chart-values-detail.resolver';

@NgModule({
  imports: [
    AppCommonModule,
    RouterModule.forChild([
      {
        path: 'chart-values',
        resolve: { data: ChartValuesListResolver },
        component: ChartValuesListComponent,
      },
      {
        path: 'chart-values/add',
        component: ChartValuesDetailComponent,
      },
      {
        path: 'chart-values/:id',
        resolve: { data: ChartValuesDetailResolver },
        component: ChartValuesDetailComponent,
      },
    ]),
  ],
  providers: [
    ChartValuesResource,
    ChartValuesListResolver,
    ChartValuesDetailResolver,
  ],
  declarations: [
    ChartValuesListComponent,
    ChartValuesDetailComponent,
  ],
})
export class ChartValuesModule { }
