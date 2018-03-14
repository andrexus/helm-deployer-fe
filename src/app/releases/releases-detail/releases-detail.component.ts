import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunicationService } from '../../app-common/communication.service';
import { ReleaseDTO } from '../releases.dto';
import { ReleasesResource } from '../releases.resource';
import { finalize } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-releases-detail',
  templateUrl: './releases-detail.component.html',
  styleUrls: ['./releases-detail.component.css']
})
export class ReleasesDetailComponent implements OnInit {

  form: FormGroup;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private resource: ReleasesResource,
              private communicator: CommunicationService, ) {
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

  private createForm(dto: ReleaseDTO) {
    return new FormGroup({
      id: new FormControl(dto.id),
      name: new FormControl(dto.name || '', [
        Validators.required,
      ]),
      version: new FormControl(dto.version || '', [
        Validators.required,
      ]),
      deployed: new FormControl(dto.delpoyed || '', [
        Validators.required,
      ]),
    });
  }

}

