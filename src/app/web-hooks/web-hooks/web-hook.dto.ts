import { BaseDTO } from '../../app-common/rest-resources/base.dto';
import { WebHookCondition } from './web-hook-condition';
import { WebHookDeployConfig } from './web-hook-deploy-config';

export interface WebHookDTO extends BaseDTO {
  name: string;
  description: string;
  condition: WebHookCondition;
  deployConfig: WebHookDeployConfig;
}
