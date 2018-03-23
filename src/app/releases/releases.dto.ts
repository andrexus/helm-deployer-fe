import { BaseDTO } from '../app-common/rest-resources/base.dto';
import { ISODate } from '../app-common/rest-resources/types';

export interface ReleaseDTO extends BaseDTO {
  name: string;
  version: string;
  delpoyed: ISODate;
}

export class ReleaseDTOClass implements ReleaseDTO {
  name: string;
  version: string;
  delpoyed: ISODate;
}
