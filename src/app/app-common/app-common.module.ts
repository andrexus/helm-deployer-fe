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
  MatToolbarModule,
  MatSelectModule,
  MatOptionModule,
  MatCheckboxModule,
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCodemirrorComponent } from './mat-codemirror/mat-codemirror.component';
import { RestResourcesModule } from './rest-resources/rest-resources.module';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { CommunicationService } from './communication.service';

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

  RestResourcesModule,
];

@NgModule({
  imports: [
    ProxyModules
  ],
  exports: [
    ProxyModules,

    MatCodemirrorComponent,
    ConfirmationDialogComponent,
  ],
  entryComponents: [
    ConfirmationDialogComponent,
  ],
  providers: [
    CommunicationService,
  ],
  declarations: [
    MatCodemirrorComponent,
    ConfirmationDialogComponent,
  ],
})
export class AppCommonModule {
}
