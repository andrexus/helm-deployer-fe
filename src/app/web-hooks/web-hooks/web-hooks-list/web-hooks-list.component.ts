import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { WebHookDTO } from '../../../app-common/dto/web-hook.dto';
import { WebHooksResource } from '../../../app-common/resources/web-hooks.resource';
import { ActivatedRoute } from '@angular/router';
import { CommunicationService } from '../../../app-common/communication.service';
import { ConfirmationDialogComponent, ConfirmationDialogData } from '../../../app-common/confirmation-dialog/confirmation-dialog.component';
import { filter, finalize, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-web-hooks-list',
  templateUrl: './web-hooks-list.component.html',
  styleUrls: ['./web-hooks-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebHooksListComponent implements OnInit, AfterViewInit {

  dataSource: MatTableDataSource<WebHookDTO>;

  columnsToDisplay = [
    'name',
    'description',
    'updatedAt',
    'deployButton',
    'editButtons',
    'deleteButtons',
  ];

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private resource: WebHooksResource,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private communicator: CommunicationService, ) {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.route.snapshot.data['hooks']);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  filter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  deploy(id: string) {
    this
      .dialog
      .open(ConfirmationDialogComponent, {
        data: <ConfirmationDialogData>{
          title: 'Deploy chart',
          content: 'Are you sure you want to proceed?',
        },
      })
      .afterClosed()
      .pipe(
        filter(ok => ok),
        tap(() => this.communicator.isLoading = true),
        switchMap(() => this.resource.deploy(id)),
        finalize(() => this.communicator.isLoading = false),
      )
      .subscribe(
        () => this.communicator.messageSuccess('Deployed successfully'),
        error => this.communicator.messageErrorUnexpected(error),
      );
  }

  remove(id: string) {
    this
      .dialog
      .open(ConfirmationDialogComponent, {
        data: <ConfirmationDialogData>{
          title: 'Delete chart value',
          content: 'Are you sure you want to proceed?',
        },
      })
      .afterClosed()
      .pipe(
        filter(ok => ok),
        tap(() => this.communicator.isLoading = true),
        switchMap(() => this.resource.delete(id)),
        finalize(() => this.communicator.isLoading = false),
      )
      .subscribe(
        () => {
          this.dataSource.data.splice(this.dataSource.data.findIndex(item => item.id === id), 1);
          this.dataSource._updateChangeSubscription();
        },
        error => this.communicator.messageErrorUnexpected(error),
      );
  }
}
