import { BaseProtectedResource } from './base-protected.resource';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseListResponseDTO } from './base-list-response.dto';

@Injectable()
export abstract class ListResource<LIST_REQUEST, LIST_OBJECT> extends BaseProtectedResource {

  public list(data: LIST_REQUEST) {
    return this.httpClient.get<BaseListResponseDTO<LIST_OBJECT>>(this.baseUrl, {
      headers: this.getHeaders(),
      params: new HttpParams({
        fromObject: <any>data
      })
    });
  }

}
