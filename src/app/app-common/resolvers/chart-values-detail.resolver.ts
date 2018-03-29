import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ChartValuesDTO } from '../dto/chart-values.dto';
import { ChartValuesResource } from '../resources/chart-values.resource';
import { take } from 'rxjs/operators';

@Injectable()
export class ChartValuesDetailResolver implements Resolve<ChartValuesDTO> {

  constructor(private resource: ChartValuesResource) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const {id} = route.params;

    return this.resource.read(id).pipe(take(1));
  }

}
