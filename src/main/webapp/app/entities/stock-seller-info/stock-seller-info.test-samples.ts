import dayjs from 'dayjs/esm';

import { IStockSellerInfo, NewStockSellerInfo } from './stock-seller-info.model';

export const sampleWithRequiredData: IStockSellerInfo = {
  id: 82745,
  distributorName: 'approach Checking',
  paymentDate: dayjs('2023-05-07T20:49'),
  totalAmount: 42616,
};

export const sampleWithPartialData: IStockSellerInfo = {
  id: 94244,
  distributorName: 'Myanmar cyan Cambridgeshire',
  paymentDate: dayjs('2023-05-07T22:29'),
  totalAmount: 35077,
};

export const sampleWithFullData: IStockSellerInfo = {
  id: 84340,
  distributorName: 'Lodge Metal',
  paymentDate: dayjs('2023-05-07T09:16'),
  totalAmount: 5539,
};

export const sampleWithNewData: NewStockSellerInfo = {
  distributorName: 'Sleek',
  paymentDate: dayjs('2023-05-07T16:43'),
  totalAmount: 55159,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
