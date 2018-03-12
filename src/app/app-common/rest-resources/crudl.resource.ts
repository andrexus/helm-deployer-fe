import { BaseProtectedResource } from './base-protected.resource';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseDTO } from './base.dto';
import { BaseListResponseDTO } from './base-list-response.dto';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable()
export abstract class CRUDLResource<OBJECT extends BaseDTO, LIST_REQUEST, LIST_OBJECT>
  extends BaseProtectedResource {

  create(data: OBJECT): Observable<OBJECT> {
    data.createdAt = data.updatedAt = new Date().toISOString();

    return this.request(
      () => this.database.add(this.offlineStore, data),
      () => this.httpClient.post<OBJECT>(this.baseUrl, data, { headers: this.getHeaders() })
    );
  }

  read(id: string): Observable<OBJECT> {
    return this.request(
      () => this.database.get(this.offlineStore, id).pipe(
        switchMap(body => {
          return Observable.create(observer => {
            if (body) {
              observer.next(body);
              observer.complete();
            } else {
              observer.error(new HttpResponse({ body, status: 404 }));
            }
          });
        })
      ),
      () => this.httpClient.get<OBJECT>(this.singleUrl(id), { headers: this.getHeaders() }),
    );
  }

  update(data: OBJECT): Observable<OBJECT> {
    data.updatedAt = new Date().toISOString();

    return this.request(
      () => this.database.put(this.offlineStore, data),
      () => this.httpClient.put<OBJECT>(this.singleUrl(data.id), data, { headers: this.getHeaders() }),
    );
  }

  delete(id: string): Observable<any> {
    return this.request(
      () => this.database.delete(this.offlineStore, id),
      () => this.httpClient.delete<void>(this.singleUrl(id), { headers: this.getHeaders() }),
    );
  }

  list(data?: LIST_REQUEST): Observable<BaseListResponseDTO<LIST_OBJECT>> {
    let params;

    if (data) {
      params = Object
        .keys(data)
        .filter(key => data[key] !== undefined && data[key] !== null)
        .map(key => ({ [key]: data[key] }))
        .reduce((res, map) => Object.assign(res, map), {});
    }

    return this.request(
      () => this.database.list(this.offlineStore).pipe(
        map((items: any[]) => {
          return {
            page: 1,
            pageSize: 9999,
            total: items.length,
            items,
          };
        })
      ),
      this.httpClient.get<BaseListResponseDTO<LIST_OBJECT>>(this.baseUrl, {
        headers: this.getHeaders(),
        params: params ? new HttpParams({ fromObject: params }) : null
      }),
    );
  }

  save(data: OBJECT) {
    if (data.id) {
      return this.update(data);
    } else {
      return this.create(data);
    }
  }

  private singleUrl(id: string) {
    return this.baseUrl + '/' + id;
  }

}
