import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ChartValueDTO } from '../../chart-values/chart-value.dto';
import { ChartValuesResource } from '../../chart-values/chart-values.resource';
import { take } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ChartValuesDetailResolver implements Resolve<ChartValueDTO[]> {

  constructor(private resource: ChartValuesResource) {
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
