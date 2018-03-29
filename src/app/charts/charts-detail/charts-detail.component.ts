import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommunicationService } from '../../app-common/communication.service';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartsResource } from '../../app-common/resources/charts.resource';
import { ChartDTO } from '../../app-common/dto/chart.dto';

@Component({
  selector: 'app-charts-detail',
  templateUrl: './charts-detail.component.html',
  styleUrls: ['./charts-detail.component.css']
})
export class ChartsDetailComponent implements OnInit {

  form: FormGroup;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private resource: ChartsResource,
              private communicator: CommunicationService,) {
  }

  ngOnInit() {
    this.form = this.createForm(this.route.snapshot.data['chart'] || {});
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

  private createForm(dto: ChartDTO) {
    return new FormGroup({
      id: new FormControl(dto.id),
      name: new FormControl(dto.name || '', [
        Validators.required,
      ]),
      version: new FormControl(dto.version || '', [
        Validators.required,
      ]),
    });
  }


}
