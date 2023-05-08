import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { StockSellerInfoComponent } from './list/stock-seller-info.component';
import { StockSellerInfoDetailComponent } from './detail/stock-seller-info-detail.component';
import { StockSellerInfoUpdateComponent } from './update/stock-seller-info-update.component';
import { StockSellerInfoDeleteDialogComponent } from './delete/stock-seller-info-delete-dialog.component';
import { StockSellerInfoRoutingModule } from './route/stock-seller-info-routing.module';

@NgModule({
  imports: [SharedModule, StockSellerInfoRoutingModule],
  declarations: [
    StockSellerInfoComponent,
    StockSellerInfoDetailComponent,
    StockSellerInfoUpdateComponent,
    StockSellerInfoDeleteDialogComponent,
  ],
})
export class StockSellerInfoModule {}
