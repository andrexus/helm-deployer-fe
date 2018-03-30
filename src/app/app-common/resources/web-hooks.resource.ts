import { CRUDLResource } from '../rest-resources/crudl.resource';
import { WebHookDTO } from '../dto/web-hook.dto';
import { OfflineStore } from '../../offline-store.enum';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

export class WebHooksResource extends CRUDLResource<WebHookDTO, void, WebHookDTO> {

  get offlineStore() {
    return OfflineStore.webHookValues;
  }

  get baseUrl() {
    return '/api/v1/webhooks';
  }

  deploy(id: string): Observable<any> {
    return this.request(
      () => of(null),
      () => this.httpClient.post<void>(this.singleUrl(id) + '/deploy', { headers: this.getHeaders() }),
    );
  }

}
