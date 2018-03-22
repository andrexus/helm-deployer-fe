import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ReleaseDTO } from '../../releases/releases.dto';
import { ReleasesResource } from '../../releases/releases.resource';
import { take } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';


@Injectable()
export class ReleasesDetailResolver implements Resolve<ReleaseDTO[]> {

  constructor(private resource: ReleasesResource) {
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
