import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RestResourcesModule } from './rest-resources/rest-resources.module';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { CommunicationService } from './communication.service';
import { MatCodemirrorModule } from 'ngx-mat-codemirror';

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
  MatCodemirrorModule,

  RestResourcesModule,
];

@NgModule({
  imports: [
    ProxyModules
  ],
  exports: [
    ProxyModules,

    ConfirmationDialogComponent,
  ],
  entryComponents: [
    ConfirmationDialogComponent,
  ],
  providers: [
    CommunicationService,
  ],
  declarations: [
    ConfirmationDialogComponent
  ],
})
export class AppCommonModule {
}
