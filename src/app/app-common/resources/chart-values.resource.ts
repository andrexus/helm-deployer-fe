import { CRUDLResource } from '../rest-resources/crudl.resource';
import { ChartValuesDTO } from '../dto/chart-values.dto';
import { OfflineStore } from '../../offline-store.enum';

export class ChartValuesResource extends CRUDLResource<ChartValuesDTO, void, ChartValuesDTO> {

  get offlineStore() {
    return OfflineStore.chartValues;
  }

  get baseUrl() {
    return '/api/v1/chart-values';
  }

}
