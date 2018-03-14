import { Injectable } from '@angular/core';
import { WebHookDTO } from '../web-hook.dto';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { WebHooksResource } from '../web-hooks.resource';
import { map, take } from 'rxjs/operators';

@Injectable()
export class WebHooksListResolver implements Resolve<WebHookDTO[]> {

  constructor(private resource: WebHooksResource) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.resource.list().pipe(
      take(1),
      map(res => res.items),
    );
  }

}
