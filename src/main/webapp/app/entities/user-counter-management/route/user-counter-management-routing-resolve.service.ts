import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IUserCounterManagement } from '../user-counter-management.model';
import { UserCounterManagementService } from '../service/user-counter-management.service';

@Injectable({ providedIn: 'root' })
export class UserCounterManagementRoutingResolveService implements Resolve<IUserCounterManagement | null> {
  constructor(protected service: UserCounterManagementService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUserCounterManagement | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((userCounterManagement: HttpResponse<IUserCounterManagement>) => {
          if (userCounterManagement.body) {
            return of(userCounterManagement.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
