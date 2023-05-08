import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IStockSellerInfo, NewStockSellerInfo } from '../stock-seller-info.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IStockSellerInfo for edit and NewStockSellerInfoFormGroupInput for create.
 */
type StockSellerInfoFormGroupInput = IStockSellerInfo | PartialWithRequiredKeyOf<NewStockSellerInfo>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IStockSellerInfo | NewStockSellerInfo> = Omit<T, 'paymentDate'> & {
  paymentDate?: string | null;
};

type StockSellerInfoFormRawValue = FormValueOf<IStockSellerInfo>;

type NewStockSellerInfoFormRawValue = FormValueOf<NewStockSellerInfo>;

type StockSellerInfoFormDefaults = Pick<NewStockSellerInfo, 'id' | 'paymentDate'>;

type StockSellerInfoFormGroupContent = {
  id: FormControl<StockSellerInfoFormRawValue['id'] | NewStockSellerInfo['id']>;
  distributorName: FormControl<StockSellerInfoFormRawValue['distributorName']>;
  paymentDate: FormControl<StockSellerInfoFormRawValue['paymentDate']>;
  totalAmount: FormControl<StockSellerInfoFormRawValue['totalAmount']>;
  user: FormControl<StockSellerInfoFormRawValue['user']>;
};

export type StockSellerInfoFormGroup = FormGroup<StockSellerInfoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class StockSellerInfoFormService {
  createStockSellerInfoFormGroup(stockSellerInfo: StockSellerInfoFormGroupInput = { id: null }): StockSellerInfoFormGroup {
    const stockSellerInfoRawValue = this.convertStockSellerInfoToStockSellerInfoRawValue({
      ...this.getFormDefaults(),
      ...stockSellerInfo,
    });
    return new FormGroup<StockSellerInfoFormGroupContent>({
      id: new FormControl(
        { value: stockSellerInfoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      distributorName: new FormControl(stockSellerInfoRawValue.distributorName, {
        validators: [Validators.required],
      }),
      paymentDate: new FormControl(stockSellerInfoRawValue.paymentDate, {
        validators: [Validators.required],
      }),
      totalAmount: new FormControl(stockSellerInfoRawValue.totalAmount, {
        validators: [Validators.required],
      }),
      user: new FormControl(stockSellerInfoRawValue.user, {
        validators: [Validators.required],
      }),
    });
  }

  getStockSellerInfo(form: StockSellerInfoFormGroup): IStockSellerInfo | NewStockSellerInfo {
    return this.convertStockSellerInfoRawValueToStockSellerInfo(
      form.getRawValue() as StockSellerInfoFormRawValue | NewStockSellerInfoFormRawValue
    );
  }

  resetForm(form: StockSellerInfoFormGroup, stockSellerInfo: StockSellerInfoFormGroupInput): void {
    const stockSellerInfoRawValue = this.convertStockSellerInfoToStockSellerInfoRawValue({ ...this.getFormDefaults(), ...stockSellerInfo });
    form.reset(
      {
        ...stockSellerInfoRawValue,
        id: { value: stockSellerInfoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): StockSellerInfoFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      paymentDate: currentTime,
    };
  }

  private convertStockSellerInfoRawValueToStockSellerInfo(
    rawStockSellerInfo: StockSellerInfoFormRawValue | NewStockSellerInfoFormRawValue
  ): IStockSellerInfo | NewStockSellerInfo {
    return {
      ...rawStockSellerInfo,
      paymentDate: dayjs(rawStockSellerInfo.paymentDate, DATE_TIME_FORMAT),
    };
  }

  private convertStockSellerInfoToStockSellerInfoRawValue(
    stockSellerInfo: IStockSellerInfo | (Partial<NewStockSellerInfo> & StockSellerInfoFormDefaults)
  ): StockSellerInfoFormRawValue | PartialWithRequiredKeyOf<NewStockSellerInfoFormRawValue> {
    return {
      ...stockSellerInfo,
      paymentDate: stockSellerInfo.paymentDate ? stockSellerInfo.paymentDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
