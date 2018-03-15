import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OfflineDatabaseService } from './offline-database.service';
import { environment } from '../../../environments/environment';
import { timer } from 'rxjs/observable/timer';
import { switchMap } from 'rxjs/operators';

@Injectable()
export abstract class BaseResource {

  abstract get baseUrl(): string;

  abstract get offlineStore(): string;

  constructor(
    protected httpClient: HttpClient,
    protected database: OfflineDatabaseService,
  ) {}

  getHeaders() {
    return new HttpHeaders();
  }

  get offlineDelay() {
    return environment.offlineDelay;
  }

  request(offline, online) {
    if (environment.offline && this.offlineStore) {
      return timer(this.offlineDelay).pipe(switchMap(offline));
    }

    return online();
  }

}
