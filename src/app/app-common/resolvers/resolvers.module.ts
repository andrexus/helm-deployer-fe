import { NgModule } from '@angular/core';
import { ChartValuesDetailResolver } from './chart-values-detail.resolver';
import { ChartValuesListResolver } from './chart-values-list.resolver';
import { ChartsResolver } from './charts.resolver';
import { ReleasesListResolver } from './releases-list.resolver';
import { ReleasesDetailResolver } from './releases-detail.resolver';
import { WebHooksDetailResolver } from './web-hooks-detail.resolver';
import { WebHooksListResolver } from './web-hooks-list.resolver';
import { ChartResolver } from './chart.resolver';

@NgModule({
  providers: [
    ChartsResolver,
    ChartResolver,
    ChartValuesListResolver,
    ChartValuesDetailResolver,
    ReleasesListResolver,
    ReleasesDetailResolver,
    WebHooksListResolver,
    WebHooksDetailResolver,
  ],
})
export class ResolversModule { }
