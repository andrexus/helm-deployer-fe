import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { ChartDTO } from '../dto/chart.dto';
import { ChartsResource } from '../resources/charts.resource';

@Injectable()
export class ChartsResolver implements Resolve<ChartDTO[]> {

  constructor(private resource: ChartsResource) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.resource.list().pipe(
      take(1),
      map(res => res.items),
    );
  }

}
