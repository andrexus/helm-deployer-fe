import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartValuesDTO } from '../../app-common/dto/chart-values.dto';
import { ChartValuesResource } from '../../app-common/resources/chart-values.resource';
import { CommunicationService } from '../../app-common/communication.service';
import { finalize } from 'rxjs/operators';
import { ChartDTO } from '../../app-common/dto/chart.dto';

@Component({
  selector: 'app-chart-values-detail',
  templateUrl: './chart-values-detail.component.html',
  styleUrls: ['./chart-values-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartValuesDetailComponent implements OnInit {

  form: FormGroup;

  chartNames: string[];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private resource: ChartValuesResource,
              private communicator: CommunicationService,) {
  }

  ngOnInit() {
    this.form = this.createForm(this.route.snapshot.data['chartValue'] || {});

    const names = (<ChartDTO[]>this.route.snapshot.data['charts']).map(c => c.name);

    this.chartNames = names.filter((n, i) => names.indexOf(n) === i);
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

  get isEdit() {
    return !!this.form.value.id;
  }

  private createForm(dto: ChartValuesDTO) {
    return new FormGroup({
      id: new FormControl(dto.id),
      chartName: new FormControl(dto.chartName || '', [
        Validators.required,
      ]),
      name: new FormControl(dto.name || '', [
        Validators.required,
      ]),
      data: new FormControl(dto.data || '', [
        Validators.required,
      ]),
    });
  }

}
