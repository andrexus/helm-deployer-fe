import { CRUDLResource } from '../../app-common/rest-resources/crudl.resource';
import { WebHookDTO } from './web-hook.dto';
import { OfflineStore } from '../../offline-store.enum';

export class WebHooksResource extends CRUDLResource<WebHookDTO, void, WebHookDTO> {
  get offlineStore() {
    return OfflineStore.webHookValues;
  }

  get baseUrl() {
    return '/api/v1/web-hooks';
  }
}
