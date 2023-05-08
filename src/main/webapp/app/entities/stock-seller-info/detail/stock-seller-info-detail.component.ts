import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStockSellerInfo } from '../stock-seller-info.model';

@Component({
  selector: 'jhi-stock-seller-info-detail',
  templateUrl: './stock-seller-info-detail.component.html',
})
export class StockSellerInfoDetailComponent implements OnInit {
  stockSellerInfo: IStockSellerInfo | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ stockSellerInfo }) => {
      this.stockSellerInfo = stockSellerInfo;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
