import { NgModule } from '@angular/core';
import { AppCommonModule } from '../app-common/app-common.module';
import { RouterModule } from '@angular/router';
import { ReleasesResource } from './releases.resource';
import { ReleasesListResolver } from './releases-list/releases-list.resolver';
import { ReleasesListComponent } from './releases-list/releases-list.component';
import { ReleasesDetailComponent } from './releases-detail/releases-detail.component';
import { ReleasesDetailResolver } from './releases-detail/releases-detail.resolver';

@NgModule({
  imports: [
    AppCommonModule,
    RouterModule.forChild([
      {
        path: 'releases',
        resolve: {data: ReleasesListResolver},
        component: ReleasesListComponent,
      },
      {
        path: 'releases/add',
        component: ReleasesDetailComponent,
      },
      {
        path: 'releases/:id',
        resolve: {data: ReleasesDetailResolver},
        component: ReleasesDetailComponent,
      },
    ])
  ],
  providers: [
    ReleasesResource,
    ReleasesListResolver,
    ReleasesDetailResolver,
  ],
  declarations: [
    ReleasesListComponent,
    ReleasesDetailComponent,
  ]
})
export class ReleasesModule {
}




