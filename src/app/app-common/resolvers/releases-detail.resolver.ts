import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ReleaseDTO } from '../dto/release.dto';
import { ReleasesResource } from '../resources/releases.resource';
import { take } from 'rxjs/operators';

@Injectable()
export class ReleasesDetailResolver implements Resolve<ReleaseDTO> {

  constructor(private resource: ReleasesResource) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const {id} = route.params;

    return this.resource.read(id).pipe(take(1));
  }

}
