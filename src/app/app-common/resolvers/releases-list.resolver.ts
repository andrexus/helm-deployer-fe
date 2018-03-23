import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ReleaseDTO } from '../../releases/releases.dto';
import { ReleasesResource } from '../../releases/releases.resource';
import { map, take } from 'rxjs/operators';


@Injectable()
export class ReleasesListResolver implements Resolve<ReleaseDTO[]> {

  constructor(private resource: ReleasesResource) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.resource.list().pipe(
      take(1),
      map(res => res.items),
    );
  }

}
