import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IStockSellerInfo } from '../stock-seller-info.model';
import { StockSellerInfoService } from '../service/stock-seller-info.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './stock-seller-info-delete-dialog.component.html',
})
export class StockSellerInfoDeleteDialogComponent {
  stockSellerInfo?: IStockSellerInfo;

  constructor(protected stockSellerInfoService: StockSellerInfoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.stockSellerInfoService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
