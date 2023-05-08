import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'branch',
        data: { pageTitle: 'Branches' },
        loadChildren: () => import('./branch/branch.module').then(m => m.BranchModule),
      },
      {
        path: 'address',
        data: { pageTitle: 'Addresses' },
        loadChildren: () => import('./address/address.module').then(m => m.AddressModule),
      },
      {
        path: 'stock-seller-info',
        data: { pageTitle: 'StockSellerInfos' },
        loadChildren: () => import('./stock-seller-info/stock-seller-info.module').then(m => m.StockSellerInfoModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
