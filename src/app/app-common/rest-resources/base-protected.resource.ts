import { BaseResource } from './base-resource';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OfflineDatabaseService } from './offline-database.service';

@Injectable()
export abstract class BaseProtectedResource extends BaseResource {

  constructor(
    protected httpClient: HttpClient,
    protected database: OfflineDatabaseService,
  ) {
    super(httpClient, database);
  }

}
