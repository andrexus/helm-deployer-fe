import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { filter, finalize, switchMap, tap } from 'rxjs/operators';
import { ConfirmationDialogComponent, ConfirmationDialogData } from '../../app-common/confirmation-dialog/confirmation-dialog.component';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { environment } from '../../../environments/environment';
import { CommunicationService } from '../../app-common/communication.service';
import { ActivatedRoute } from '@angular/router';
import { ChartsResource } from '../../app-common/resources/charts.resource';
import { ChartDTO } from '../../app-common/dto/chart.dto';

@Component({
  selector: 'app-charts-list',
  templateUrl: './charts-list.component.html',
  styleUrls: ['./charts-list.component.css']
})
export class ChartsListComponent implements OnInit, AfterViewInit {

  dataSource: MatTableDataSource<ChartDTO>;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private resource: ChartsResource,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private communicator: CommunicationService,
  ) { }


  ngOnInit() {
    this.dataSource = new MatTableDataSource<ChartDTO>(this.route.snapshot.data['charts']);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  get columnsToDisplay() {
    const always = [
      'name',
      'version',
    ];

    if (!environment.offline) {
      return always;
    }

    return [
      ...always,
      'editButtons',
      'deleteButtons',
    ];
  }

  filter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  remove(id: string) {
    this
      .dialog
      .open(ConfirmationDialogComponent, {
        data: <ConfirmationDialogData>{
          title: 'Delete release value',
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
