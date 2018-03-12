import { Injectable } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CommunicationService {

  loading = new BehaviorSubject<boolean>(true);

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.listenToRouter();
  }

  get isLoading() {
    return this.loading.getValue();
  }

  set isLoading(value: boolean) {
    this.loading.next(value);
  }

  messageSuccess(message: string) {
    this.snackBar.open(message, null, { duration: 3000, panelClass: 'snack-success' });
  }

  messageSuccessSaved() {
    this.messageSuccess('Saved');
  }

  messageError(message: string, error?: Error) {
    if (error) {
      console.error(error);
    }

    this.snackBar.open(message, null, { duration: 3000, panelClass: 'snack-error' });
  }

  messageErrorUnexpected(error?: Error) {
    this.messageError('Unexpected error', error);
  }

  private listenToRouter() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading.next(true);
      }

      if (event instanceof NavigationEnd) {
        this.loading.next(false);
      }

      if (event instanceof NavigationError) {
        this.messageErrorUnexpected(event.error);
        this.loading.next(false);
      }

      if (event instanceof NavigationCancel) {
        //
      }
    });
  }

}
