import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { StockSellerInfoFormService, StockSellerInfoFormGroup } from './stock-seller-info-form.service';
import { IStockSellerInfo } from '../stock-seller-info.model';
import { StockSellerInfoService } from '../service/stock-seller-info.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';

@Component({
  selector: 'jhi-stock-seller-info-update',
  templateUrl: './stock-seller-info-update.component.html',
})
export class StockSellerInfoUpdateComponent implements OnInit {
  isSaving = false;
  stockSellerInfo: IStockSellerInfo | null = null;

  usersSharedCollection: IUser[] = [];

  editForm: StockSellerInfoFormGroup = this.stockSellerInfoFormService.createStockSellerInfoFormGroup();

  constructor(
    protected stockSellerInfoService: StockSellerInfoService,
    protected stockSellerInfoFormService: StockSellerInfoFormService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareUser = (o1: IUser | null, o2: IUser | null): boolean => this.userService.compareUser(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ stockSellerInfo }) => {
      this.stockSellerInfo = stockSellerInfo;
      if (stockSellerInfo) {
        this.updateForm(stockSellerInfo);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const stockSellerInfo = this.stockSellerInfoFormService.getStockSellerInfo(this.editForm);
    if (stockSellerInfo.id !== null) {
      this.subscribeToSaveResponse(this.stockSellerInfoService.update(stockSellerInfo));
    } else {
      this.subscribeToSaveResponse(this.stockSellerInfoService.create(stockSellerInfo));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStockSellerInfo>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(stockSellerInfo: IStockSellerInfo): void {
    this.stockSellerInfo = stockSellerInfo;
    this.stockSellerInfoFormService.resetForm(this.editForm, stockSellerInfo);

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing<IUser>(this.usersSharedCollection, stockSellerInfo.user);
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing<IUser>(users, this.stockSellerInfo?.user)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));
  }
}
