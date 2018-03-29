import { BaseDTO } from '../rest-resources/base.dto';
import { ISODate } from '../rest-resources/types';

export interface ChartDTO extends BaseDTO {
  name: string;
  version: string;
  description: string;
  apiVersion: string;
  urls: string[];
  created: ISODate;
  digest: string;
}
