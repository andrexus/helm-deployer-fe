import { BaseProtectedResource } from './base-protected.resource';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class SingleValueResource<T> extends BaseProtectedResource {

  public get() {
    return this.request(
      () => this.database.get(this.offlineStore, '0'),
      () => this.httpClient.get<T>(this.baseUrl, { headers: this.getHeaders() }),
    );
  }

  public set(data: T) {
    return this.request(
      () => this.database.put(this.offlineStore, Object.assign({ id: '0' }, data)),
      () => this.httpClient.put<T>(this.baseUrl, data, { headers: this.getHeaders() }),
    );
  }

}
