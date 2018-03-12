import { ID, ISODate } from './types';

export interface BaseDTO {
  id?: ID;
  userId?: ID;
  createdAt?: ISODate;
  updatedAt?: ISODate;
}

export class BaseDTOClass implements BaseDTO {
  id?: ID;
  userId?: ID;
  createdAt?: ISODate;
  updatedAt?: ISODate;
}
