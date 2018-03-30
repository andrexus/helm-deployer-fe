import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ReleaseDTO } from '../../app-common/dto/release.dto';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { filter, finalize, switchMap, tap } from 'rxjs/operators';
import { ConfirmationDialogComponent, ConfirmationDialogData } from '../../app-common/confirmation-dialog/confirmation-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { CommunicationService } from '../../app-common/communication.service';
import { ReleasesResource } from '../../app-common/resources/releases.resource';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-releases-list',
  templateUrl: './releases-list.component.html',
  styleUrls: ['./releases-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReleasesListComponent implements OnInit, AfterViewInit {

  dataSource: MatTableDataSource<ReleaseDTO>;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private resource: ReleasesResource,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private communicator: CommunicationService, ) {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<ReleaseDTO>(this.route.snapshot.data['releases']);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  get columnsToDisplay() {
    const always = [
      'name',
      'namespace',
      'version',
      'deployed',
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
