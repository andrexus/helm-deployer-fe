import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ChartValuesDTO } from '../dto/chart-values.dto';
import { ChartValuesResource } from '../resources/chart-values.resource';
import { map, take } from 'rxjs/operators';

@Injectable()
export class ChartValuesListResolver implements Resolve<ChartValuesDTO[]> {

  constructor(private resource: ChartValuesResource) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.resource.list().pipe(
      take(1),
      map(res => res.items),
    );
  }

}
