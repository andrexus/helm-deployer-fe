import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunicationService } from '../../../app-common/communication.service';
import { finalize } from 'rxjs/operators';
import { WebHookDTO } from '../web-hook.dto';
import { WebHooksResource } from '../web-hooks.resource';

@Component({
  selector: 'app-web-hooks-detail',
  templateUrl: './web-hooks-detail.component.html',
  styleUrls: ['./web-hooks-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebHooksDetailComponent implements OnInit {

  lineNumbers = false;

  form: FormGroup;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private resource: WebHooksResource,
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


  private createForm(dto: WebHookDTO) {
    return new FormGroup({
      id: new FormControl(dto.id),
      name: new FormControl(dto.name || '', [
        Validators.required,
      ]),
      description: new FormControl(dto.description || '', [
        Validators.required,
      ]),
      condition: new FormControl(dto.condition || '', [
        Validators.required,
      ]),
      deployConfig: new FormControl(dto.deployConfig || '', [
        Validators.required,
      ]),
    });
  }
}
