import { CRUDLResource } from '../app-common/rest-resources/crudl.resource';
import { ChartValueDTO } from './chart-value.dto';
import { OfflineStore } from '../offline-store.enum';

export class ChartValuesResource extends CRUDLResource<ChartValueDTO, void, ChartValueDTO> {

  get offlineStore() {
    return OfflineStore.chartValues;
  }

  get baseUrl() {
    return '/api/v1/chart-values';
  }

}
