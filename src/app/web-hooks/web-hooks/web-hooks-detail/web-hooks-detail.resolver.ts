import { Injectable } from '@angular/core';
import { WebHooksResource } from '../web-hooks.resource';
import { WebHookDTO } from '../web-hook.dto';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { take } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class WebHooksDetailResolver implements Resolve<WebHookDTO[]> {

  constructor(private resource: WebHooksResource) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const {id} = route.params;

    if (id) {
      return this.resource.read(id).pipe(
        take(1),
      );
    }

    return of(null);
  }
}
