import { NgModule } from '@angular/core';
import { OfflineDatabaseService } from './offline-database.service';

@NgModule({
  providers: [
    OfflineDatabaseService,
  ]
})
export class RestResourcesModule {
}
