import { NgModule } from '@angular/core';
import { AppCommonModule } from '../app-common/app-common.module';
import { RouterModule } from '@angular/router';
import { ReleasesListResolver } from '../app-common/resolvers/releases-list.resolver';
import { ReleasesListComponent } from './releases-list/releases-list.component';
import { ReleasesDetailComponent } from './releases-detail/releases-detail.component';
import { ReleasesDetailResolver } from '../app-common/resolvers/releases-detail.resolver';
import { OnOfflineDatabaseOnlyGuard } from '../app-common/on-offline-database-only.guard';
import { ChartsResolver } from '../app-common/resolvers/charts.resolver';

@NgModule({
  imports: [
    AppCommonModule,
    RouterModule.forChild([
      {
        path: 'releases',
        resolve: {
          releases: ReleasesListResolver,
        },
        component: ReleasesListComponent,
      },
      {
        path: 'releases/add',
        canActivate: [OnOfflineDatabaseOnlyGuard],
        component: ReleasesDetailComponent,
        resolve: {
          charts: ChartsResolver,
        },
      },
      {
        path: 'releases/:id',
        canActivate: [OnOfflineDatabaseOnlyGuard],
        resolve: {
          charts: ChartsResolver,
          release: ReleasesDetailResolver,
        },
        component: ReleasesDetailComponent,
      },
    ])
  ],
  declarations: [
    ReleasesListComponent,
    ReleasesDetailComponent,
  ]
})
export class ReleasesModule {
}




