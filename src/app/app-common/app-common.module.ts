import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatOptionModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatRadioModule,
  MatSelectModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RestResourcesModule } from './rest-resources/rest-resources.module';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { CommunicationService } from './communication.service';
import { MatCodemirrorModule } from 'ngx-mat-codemirror';
import { OnOfflineDatabaseOnlyGuard } from './on-offline-database-only.guard';
import { OnOfflineDatabaseOnlyDirective } from './on-offline-database-only.directive';
import { ResolversModule } from './resolvers/resolvers.module';
import { ResourcesModule } from './resources/resources.module';

const ProxyModules = [
  CommonModule,
  ReactiveFormsModule,
  FlexLayoutModule,

  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatToolbarModule,
  MatMenuModule,
  MatInputModule,
  MatTableModule,
  MatSnackBarModule,
  MatProgressBarModule,
  MatSortModule,
  MatPaginatorModule,
  MatDialogModule,
  MatSelectModule,
  MatOptionModule,
  MatCheckboxModule,
  MatCodemirrorModule,
  MatDividerModule,
  MatRadioModule,
  MatAutocompleteModule,

  RestResourcesModule,
];

@NgModule({
  imports: [
    ProxyModules,

    ResolversModule,
    ResourcesModule,
  ],
  exports: [
    ProxyModules,

    ConfirmationDialogComponent,
    OnOfflineDatabaseOnlyDirective,
  ],
  entryComponents: [
    ConfirmationDialogComponent,
  ],
  providers: [
    CommunicationService,
    OnOfflineDatabaseOnlyGuard,
  ],
  declarations: [
    ConfirmationDialogComponent,
    OnOfflineDatabaseOnlyDirective,
  ],
})
export class AppCommonModule {
}
