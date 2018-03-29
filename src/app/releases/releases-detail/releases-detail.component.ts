import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunicationService } from '../../app-common/communication.service';
import { ReleaseDTO } from '../../app-common/dto/release.dto';
import { ReleasesResource } from '../../app-common/resources/releases.resource';
import { finalize } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChartDTO } from '../../app-common/dto/chart.dto';
import { untilDestroyed } from 'ngx-rx-collector';
import { interval } from 'rxjs/observable/interval';

@Component({
  selector: 'app-releases-detail',
  templateUrl: './releases-detail.component.html',
  styleUrls: ['./releases-detail.component.css']
})
export class ReleasesDetailComponent implements OnInit, OnDestroy {

  form: FormGroup;

  private charts: ChartDTO[];

  private chartNameControl: FormControl;

  private chartVersionControl: FormControl;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private resource: ReleasesResource,
              private communicator: CommunicationService,) {
  }

  ngOnInit() {
    this.form = this.createForm(this.route.snapshot.data['release'] || {});
    this.charts = this.route.snapshot.data['charts'];

    this.chartNameControl.valueChanges.pipe(untilDestroyed(this)).subscribe(val => {
      if (!this.getChartVersions(val).includes(this.value.chart.metadata.version)) {
        this.chartVersionControl.setValue('');
      }
    });
  }

  ngOnDestroy() {}

  get chartNames() {
    const names = this.charts.map(c => c.name);

    return names.filter((n, i) => names.indexOf(n) === i);
  }

  get chartVersions() {
    return this.getChartVersions(this.value.chart.metadata.name);
  }

  getChartVersions(name: string) {
    return this.charts.filter(c => c.name === name).map(c => c.version);
  }

  save() {
    this.communicator.isLoading = true;

    this.resource.save(this.form.value)
      .pipe(
        finalize(() => this.communicator.isLoading = false),
      )
      .subscribe(
        () => {
          this.communicator.messageSuccessSaved();
          this.router.navigate(['..'], {relativeTo: this.route});
        },
        error => this.communicator.messageErrorUnexpected(error),
      );
  }

  get value() {
    return <ReleaseDTO>this.form.value;
  }

  get isEdit() {
    return !!this.form.value.id;
  }

  private createForm(dto: ReleaseDTO) {
    dto.info = dto.info || <any>{};
    dto.chart = dto.chart || <any>{};
    dto.chart.metadata = dto.chart.metadata || <any>{};

    return new FormGroup({
      id: new FormControl(dto.id),
      name: new FormControl(dto.name || '', Validators.required),
      namespace: new FormControl(dto.namespace || ''),
      version: new FormControl(dto.version || '', Validators.required),
      info: new FormGroup({
        first_deployed: new FormControl(dto.info.first_deployed || new Date().toISOString()),
        last_deployed: new FormControl(dto.info.first_deployed || new Date().toISOString()),
        Description: new FormControl(dto.name || ''),
      }),
      chart: new FormGroup({
        metadata: new FormGroup({
          name: this.chartNameControl = new FormControl(dto.chart.metadata.name || '', Validators.required),
          version: this.chartVersionControl = new FormControl(dto.chart.metadata.version || '', Validators.required),
          description: new FormControl(dto.chart.metadata.description || ''),
          apiVersion: new FormControl(dto.chart.metadata.apiVersion || ''),
        })
      })
    });
  }

}

