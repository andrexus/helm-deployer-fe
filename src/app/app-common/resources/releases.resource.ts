import { CRUDLResource } from '../rest-resources/crudl.resource';
import { ReleaseDTO } from '../dto/release.dto';
import { OfflineStore } from '../../offline-store.enum';

export class ReleasesResource extends CRUDLResource<ReleaseDTO, void, ReleaseDTO> {

  get offlineStore() {
    return OfflineStore.releaseValues;
  }

  get baseUrl() {
    return '/api/v1/releases';
  }

}
