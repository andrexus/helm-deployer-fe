import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ChartValueDTO } from '../../chart-values/chart-value.dto';
import { ChartValuesResource } from '../../chart-values/chart-values.resource';
import { map, take } from 'rxjs/operators';

@Injectable()
export class ChartValuesListResolver implements Resolve<ChartValueDTO[]> {

  constructor(private resource: ChartValuesResource) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.resource.list().pipe(
      take(1),
      map(res => res.items),
    );
  }

}
