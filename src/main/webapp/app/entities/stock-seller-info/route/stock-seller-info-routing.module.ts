import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { StockSellerInfoComponent } from '../list/stock-seller-info.component';
import { StockSellerInfoDetailComponent } from '../detail/stock-seller-info-detail.component';
import { StockSellerInfoUpdateComponent } from '../update/stock-seller-info-update.component';
import { StockSellerInfoRoutingResolveService } from './stock-seller-info-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const stockSellerInfoRoute: Routes = [
  {
    path: '',
    component: StockSellerInfoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: StockSellerInfoDetailComponent,
    resolve: {
      stockSellerInfo: StockSellerInfoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: StockSellerInfoUpdateComponent,
    resolve: {
      stockSellerInfo: StockSellerInfoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: StockSellerInfoUpdateComponent,
    resolve: {
      stockSellerInfo: StockSellerInfoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(stockSellerInfoRoute)],
  exports: [RouterModule],
})
export class StockSellerInfoRoutingModule {}
