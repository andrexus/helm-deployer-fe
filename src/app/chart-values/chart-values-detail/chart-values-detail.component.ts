import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartValueDTO } from '../chart-value.dto';
import { ChartValuesResource } from '../chart-values.resource';
import { CommunicationService } from '../../app-common/communication.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-chart-values-detail',
  templateUrl: './chart-values-detail.component.html',
  styleUrls: ['./chart-values-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartValuesDetailComponent implements OnInit {

  lineNumbers = false;

  form: FormGroup;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private resource: ChartValuesResource,
              private communicator: CommunicationService,) {
  }

  ngOnInit() {
    this.form = this.createForm(this.route.snapshot.data['data'] || {});
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

  private createForm(dto: ChartValueDTO) {
    return new FormGroup({
      id: new FormControl(dto.id),
      chartName: new FormControl(dto.chartName || '', [
        Validators.required,
      ]),
      name: new FormControl(dto.name || '', [
        Validators.required,
      ]),
      version: new FormControl(dto.version || ''),
      data: new FormControl(dto.data || '', [
        Validators.required,
      ]),
    });
  }

}
