import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunicationService } from '../../../app-common/communication.service';
import { finalize, map, startWith } from 'rxjs/operators';
import { WebHookDTO } from '../../../app-common/dto/web-hook.dto';
import { WebHooksResource } from '../../../app-common/resources/web-hooks.resource';
import { ReleaseDTO } from '../../../app-common/dto/release.dto';
import { ChartDTO } from '../../../app-common/dto/chart.dto';
import { ChartValuesDTO } from '../../../app-common/dto/chart-values.dto';
import { untilDestroyed } from 'ngx-rx-collector';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-web-hooks-detail',
  templateUrl: './web-hooks-detail.component.html',
  styleUrls: ['./web-hooks-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebHooksDetailComponent implements OnInit, OnDestroy {

  form: FormGroup;

  gitProjects: Observable<string[]>;

  gitRepositories: Observable<string[]>;

  gitBranches = [
    'master',
    'develop',
  ];

  gitProjectControl: FormControl;
  gitRepositoryControl: FormControl;

  releaseControl: FormControl;
  versionControl: FormControl;
  chartNameControl: FormControl;
  chartValueControl: FormControl;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private resource: WebHooksResource,
              private communicator: CommunicationService) {
  }

  ngOnInit() {
    this.form = this.createForm(this.route.snapshot.data['hook'] || {});

    this.gitProjects = this.gitProjectControl.valueChanges
      .pipe(
        startWith(''),
        untilDestroyed(this),
        map(val => {
          const all: WebHookDTO[] = this.route.snapshot.data['hooks'];
          const names = all.map(h => h.condition.projectNamespace);

          return names.filter((n, i) => n.startsWith(val) && names.indexOf(n) === i).sort();
        })
      );

    this.gitRepositories = this.gitRepositoryControl.valueChanges
      .pipe(
        startWith(''),
        untilDestroyed(this),
        map(val => {
          const all: WebHookDTO[] = this.route.snapshot.data['hooks'];
          const names = all.map(h => h.condition.projectName);

          return names.filter((n, i) => n.startsWith(val) && names.indexOf(n) === i).sort();
        })
      );

    this.releaseControl.valueChanges.pipe(untilDestroyed(this)).subscribe(val => {
      const release: ReleaseDTO = this.route.snapshot.data['releases'].find(r => r.name === val);

      this.chartNameControl.setValue(release ? release.chart.metadata.name : '');
      this.versionControl.setValue(release ? release.chart.metadata.version : '');
    });

    this.chartNameControl.valueChanges.pipe(untilDestroyed(this)).subscribe(() => {
      this.versionControl.setValue('');
      this.chartValueControl.setValue('');
    });
  }

  ngOnDestroy() {}

  save() {
    this.communicator.isLoading = true;

    this.resource.save(this.form.value)
      .pipe(
        finalize(() => this.communicator.isLoading = false),
      )
      .subscribe(
        () => {
          this.communicator.messageSuccessSaved();
          this.router.navigate(['..'], { relativeTo: this.route });
        },
        error => this.communicator.messageErrorUnexpected(error),
      );
  }

  get isEdit() {
    return !!this.form.value.id;
  }

  get releases() {
    const all: ReleaseDTO[] = this.route.snapshot.data['releases'];

    return all.map(r => r.name).sort();
  }

  get chartNames() {
    const charts: ChartDTO[] = this.route.snapshot.data['charts'];
    const release: ReleaseDTO = this.route.snapshot.data['releases'].find(r => r.name === this.releaseControl.value);
    const names = charts.map(c => c.name).filter(name => release && name === release.chart.metadata.name);

    return names.filter((n, i) => names.indexOf(n) === i).sort();
  }

  get chartVersions() {
    const charts: ChartDTO[] = this.route.snapshot.data['charts'];

    return charts.filter(c => c.name === this.chartNameControl.value).map(r => r.version).sort();
  }

  get chartValues() {
    const all: ChartValuesDTO[] = this.route.snapshot.data['chartValues'];

    return all.filter(cv => cv.chartName === this.chartNameControl.value);
  }


  private createForm(dto: WebHookDTO) {
    dto.condition = dto.condition || <any>{};
    dto.deployConfig = dto.deployConfig || <any>{};

    return new FormGroup({
      id: new FormControl(dto.id),
      name: new FormControl(dto.name || '', Validators.required),
      description: new FormControl(dto.description || ''),
      condition: new FormGroup({
        webhookType: new FormControl(dto.condition.webhookType || 'pipeline'),
        projectNamespace: this.gitProjectControl = new FormControl(dto.condition.projectNamespace || '', Validators.required),
        projectName: this.gitRepositoryControl = new FormControl(dto.condition.projectName || '', Validators.required),
        gitRef: new FormControl(dto.condition.gitRef || '', Validators.required),
        isTag: new FormControl(dto.condition.isTag),
      }),
      deployConfig: new FormGroup({
        releaseName: this.releaseControl = new FormControl(dto.deployConfig.releaseName || '', Validators.required),
        chartName: this.chartNameControl = new FormControl(dto.deployConfig.chartName || '', Validators.required),
        chartVersion: this.versionControl = new FormControl(dto.deployConfig.chartVersion || '', Validators.required),
        chartValuesId: this.chartValueControl = new FormControl(dto.deployConfig.chartValuesId || ''),
      }),
    });
  }
}
