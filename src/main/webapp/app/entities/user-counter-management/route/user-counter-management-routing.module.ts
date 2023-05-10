import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { UserCounterManagementComponent } from '../list/user-counter-management.component';
import { UserCounterManagementDetailComponent } from '../detail/user-counter-management-detail.component';
import { UserCounterManagementUpdateComponent } from '../update/user-counter-management-update.component';
import { UserCounterManagementRoutingResolveService } from './user-counter-management-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const userCounterManagementRoute: Routes = [
  {
    path: '',
    component: UserCounterManagementComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UserCounterManagementDetailComponent,
    resolve: {
      userCounterManagement: UserCounterManagementRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UserCounterManagementUpdateComponent,
    resolve: {
      userCounterManagement: UserCounterManagementRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UserCounterManagementUpdateComponent,
    resolve: {
      userCounterManagement: UserCounterManagementRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userCounterManagementRoute)],
  exports: [RouterModule],
})
export class UserCounterManagementRoutingModule {}
