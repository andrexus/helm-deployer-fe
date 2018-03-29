import { BaseDTO } from '../rest-resources/base.dto';

export interface ChartValuesDTO extends BaseDTO {
  chartName: string;
  name: string;
  data: string;
}
