import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ChartValuesResource } from '../chart-values.resource';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ChartValueDTO } from '../chart-value.dto';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogComponent, ConfirmationDialogData } from '../../app-common/confirmation-dialog/confirmation-dialog.component';
import { filter, finalize, switchMap, tap } from 'rxjs/operators';
import { CommunicationService } from '../../app-common/communication.service';

@Component({
  selector: 'app-chart-values-list',
  templateUrl: './chart-values-list.component.html',
  styleUrls: ['./chart-values-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartValuesListComponent implements OnInit, AfterViewInit {

  dataSource: MatTableDataSource<ChartValueDTO>;

  columnsToDisplay = [
    'chartName',
    'name',
    'updatedAt',
    'editButtons',
    'deleteButtons',
  ];

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private resource: ChartValuesResource,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private communicator: CommunicationService,
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.route.snapshot.data['data']);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  filter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
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
