import { BaseDTO } from '../rest-resources/base.dto';
import { ID } from '../rest-resources/types';

export interface WebHookDTO extends BaseDTO {
  name: string;
  description: string;
  condition: {
    webhookType: string;
    projectName: string;
    projectNamespace: string;
    gitRef: string;
    isTag: boolean;
  };
  deployConfig: {
    releaseName: string;
    chartName: string;
    chartVersion: string;
    chartValuesId: ID;
  };
}
