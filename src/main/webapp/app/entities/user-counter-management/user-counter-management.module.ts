import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { UserCounterManagementComponent } from './list/user-counter-management.component';
import { UserCounterManagementDetailComponent } from './detail/user-counter-management-detail.component';
import { UserCounterManagementUpdateComponent } from './update/user-counter-management-update.component';
import { UserCounterManagementDeleteDialogComponent } from './delete/user-counter-management-delete-dialog.component';
import { UserCounterManagementRoutingModule } from './route/user-counter-management-routing.module';

@NgModule({
  imports: [SharedModule, UserCounterManagementRoutingModule],
  declarations: [
    UserCounterManagementComponent,
    UserCounterManagementDetailComponent,
    UserCounterManagementUpdateComponent,
    UserCounterManagementDeleteDialogComponent,
  ],
})
export class UserCounterManagementModule {}
