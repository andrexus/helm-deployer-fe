import { NgModule } from '@angular/core';
import { ChartsResource } from './charts.resource';
import { ChartValuesResource } from './chart-values.resource';
import { ReleasesResource } from './releases.resource';
import { WebHooksResource } from './web-hooks.resource';

@NgModule({
  providers: [
    ChartsResource,
    ChartValuesResource,
    ReleasesResource,
    WebHooksResource,
  ]
})
export class ResourcesModule { }
