import { ChartValueDTO, ChartValueDtoClass } from '../../chart-values/chart-value.dto';
import { ReleaseDTO, ReleaseDTOClass } from '../../releases/releases.dto';

export class WebHookDeployConfig {
  chartValue: ChartValueDTO;
  release: ReleaseDTO;

  constructor() {
    this.chartValue = new ChartValueDtoClass();
    this.release = new ReleaseDTOClass();
  }
}
