import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { take } from 'rxjs/operators';
import { ChartDTO } from '../dto/chart.dto';
import { ChartsResource } from '../resources/charts.resource';

@Injectable()
export class ChartResolver implements Resolve<ChartDTO> {

  constructor(private resource: ChartsResource) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const {id} = route.params;

    return this.resource.read(id).pipe(take(1));
  }

}
