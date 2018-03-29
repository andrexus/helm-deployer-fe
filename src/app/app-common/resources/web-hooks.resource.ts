import { CRUDLResource } from '../rest-resources/crudl.resource';
import { WebHookDTO } from '../dto/web-hook.dto';
import { OfflineStore } from '../../offline-store.enum';

export class WebHooksResource extends CRUDLResource<WebHookDTO, void, WebHookDTO> {
  get offlineStore() {
    return OfflineStore.webHookValues;
  }

  get baseUrl() {
    return '/api/v1/web-hooks';
  }
}
