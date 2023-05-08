import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IStockSellerInfo } from '../stock-seller-info.model';
import { StockSellerInfoService } from '../service/stock-seller-info.service';

@Injectable({ providedIn: 'root' })
export class StockSellerInfoRoutingResolveService implements Resolve<IStockSellerInfo | null> {
  constructor(protected service: StockSellerInfoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStockSellerInfo | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((stockSellerInfo: HttpResponse<IStockSellerInfo>) => {
          if (stockSellerInfo.body) {
            return of(stockSellerInfo.body);
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
