import { Injectable } from '@angular/core';
import { WebHooksResource } from '../resources/web-hooks.resource';
import { WebHookDTO } from '../dto/web-hook.dto';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { take } from 'rxjs/operators';

@Injectable()
export class WebHooksDetailResolver implements Resolve<WebHookDTO> {

  constructor(private resource: WebHooksResource) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { id } = route.params;

    return this.resource.read(id).pipe(take(1));
  }

}
