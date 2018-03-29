import { BaseDTO } from '../rest-resources/base.dto';
import { ISODate } from '../rest-resources/types';

export interface ReleaseDTO extends BaseDTO {
  name: string;
  namespace: string;
  version: number;
  info: {
    first_deployed: ISODate;
    last_deployed: ISODate;
    Description: string;
  };
  chart: {
    metadata: {
      name: string;
      version: string;
      description: string;
      apiVersion: string;
    }
  };
}
