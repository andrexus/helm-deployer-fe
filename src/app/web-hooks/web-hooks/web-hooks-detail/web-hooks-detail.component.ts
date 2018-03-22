import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunicationService } from '../../../app-common/communication.service';
import { finalize, map, take } from 'rxjs/operators';
import { WebHookDTO } from '../web-hook.dto';
import { WebHooksResource } from '../web-hooks.resource';
import { WebHookCondition } from '../web-hook-condition';
import { WebHookDeployConfig } from '../web-hook-deploy-config';
import { ReleaseDTO } from '../../../releases/releases.dto';
import { ChartValueDTO } from '../../../chart-values/chart-value.dto';
import { ChartValuesResource } from '../../../chart-values/chart-values.resource';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-web-hooks-detail',
  templateUrl: './web-hooks-detail.component.html',
  styleUrls: ['./web-hooks-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebHooksDetailComponent implements OnInit {

  webhookTypes = ['pipeline'];
  form: FormGroup;

  chartValues: ChartValueDTO[];
  releases: ReleaseDTO[];

  chartNames: string[];
  chartVersions: string[];
  selectedChartName: string;
  selectedChartValue: string;
  selectedChartVersion: string;

  chartNameControl: FormControl;
  versionControl: FormControl;
  chartValueControl: FormControl;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private resource: WebHooksResource,
              private chartValuesResource: ChartValuesResource,
              private communicator: CommunicationService,) {
  }

  ngOnInit() {
    this.form = this.createForm(this.route.snapshot.data['webHookData'] || {});
    this.releases = this.route.snapshot.data['releaseData'] || {};
    this.chartValues = this.route.snapshot.data['chartValueData'] || {};
    this.chartNames = this.chartValues
      .map(chart => chart.chartName)
      .filter((value, index, self) => self.indexOf(value) === index);

    merge(this.chartNameControl.valueChanges,
      this.versionControl.valueChanges,
      this.chartValueControl.valueChanges, of(null))
      .subscribe(() => {
        this.refreshChartVersions();
        this.refreshChartValues();
      });
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
          this.router.navigate(['..'], { relativeTo: this.route });
        },
        error => this.communicator.messageErrorUnexpected(error),
      );
  }

  get isEdit() {
    return !!this.form.value.id;
  }

  private refreshChartVersions() {
    this.chartVersions = this.route.snapshot.data['chartValueData']
      .filter(chart => chart.chartName === this.chartNameControl.value || !this.chartNameControl.value)
      .map(chart => chart.version) || {};
  }

  private refreshChartValues() {
    this.chartValues = this.route.snapshot.data['chartValueData']
      .filter((chart) => chart.chartName === this.chartNameControl.value || !this.chartNameControl.value
        && chart.version === this.versionControl.value || !this.versionControl.value) || {};
  }


  private createForm(dto: WebHookDTO) {

    if (!dto.condition) {
      dto.condition = new WebHookCondition();
    }

    if (!dto.deployConfig) {
      dto.deployConfig = new WebHookDeployConfig();
    }

    this.selectedChartName = dto.deployConfig.chartValue.chartName;
    this.selectedChartVersion = dto.deployConfig.chartValue.version;
    this.selectedChartValue = dto.deployConfig.chartValue.name;

    return new FormGroup({
      id: new FormControl(dto.id),
      name: new FormControl(dto.name || '', [
        Validators.required,
      ]),
      description: new FormControl(dto.description || '', [
        Validators.required,
      ]),
      condition: new FormGroup({
        projectNamespace: new FormControl(dto.condition.projectNamespace || '', [
          Validators.required,
        ]),
        projectName: new FormControl(dto.condition.projectName || '', [
          Validators.required,
        ]),
        gitRef: new FormControl(dto.condition.gitRef || '', [
          Validators.required,
        ]),
        isTag: new FormControl(dto.condition.isTag || ''),
      }),
      deployConfig: new FormGroup({
        release: new FormGroup({
          name: new FormControl(dto.deployConfig.release.name || '', [
            Validators.required,
          ]),
        }),
        chartValue: new FormGroup({
          chartName: this.chartNameControl = new FormControl(dto.deployConfig.chartValue.chartName || '', [
            Validators.required,
          ]),
          version: this.versionControl = new FormControl({
            value: dto.deployConfig.chartValue.version || '',
            disabled: this.selectedChartName === '',
          }, [
            Validators.required,
          ]),
          name: this.chartValueControl = new FormControl({
            value: dto.deployConfig.chartValue.name || '',
            disabled: this.selectedChartVersion === '',
          }, []),
        }),
      }),
    });
  }
}
