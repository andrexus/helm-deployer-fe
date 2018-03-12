import { BaseDTO } from '../app-common/rest-resources/base.dto';

export interface ChartValueDTO extends BaseDTO {
  chartName: string;
  name: string;
  data: string;
}
