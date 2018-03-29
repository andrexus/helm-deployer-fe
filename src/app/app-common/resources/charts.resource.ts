import { CRUDLResource } from '../rest-resources/crudl.resource';
import { OfflineStore } from '../../offline-store.enum';
import { ChartDTO } from '../dto/chart.dto';

export class ChartsResource extends CRUDLResource<ChartDTO, void, ChartDTO> {

  get offlineStore() {
    return OfflineStore.charts;
  }

  get baseUrl() {
    return '/api/v1/charts';
  }

}
