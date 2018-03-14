import { BaseDTO } from '../../app-common/rest-resources/base.dto';

export interface WebHookDTO extends BaseDTO {
  name: string;
  description: string;
  condition: string;
  deployConfig: string;
}
