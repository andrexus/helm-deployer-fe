import { CRUDLResource } from '../app-common/rest-resources/crudl.resource';
import { ReleaseDTO } from './releases.dto';
import { OfflineStore } from '../offline-store.enum';

export class ReleasesResource extends CRUDLResource<ReleaseDTO, void, ReleaseDTO> {

  get offlineStore() {
    return OfflineStore.releaseValues;
  }

  get baseUrl() {
    return '/api/v1/releases';
  }

}
