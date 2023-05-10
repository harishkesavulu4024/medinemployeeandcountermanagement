import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IUserCounterManagement } from '../user-counter-management.model';
import { UserCounterManagementService } from '../service/user-counter-management.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './user-counter-management-delete-dialog.component.html',
})
export class UserCounterManagementDeleteDialogComponent {
  userCounterManagement?: IUserCounterManagement;

  constructor(protected userCounterManagementService: UserCounterManagementService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.userCounterManagementService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
