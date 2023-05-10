import dayjs from 'dayjs/esm';

import { IUserCounterManagement, NewUserCounterManagement } from './user-counter-management.model';

export const sampleWithRequiredData: IUserCounterManagement = {
  id: 36686,
  totalAmount: 18054,
  openingTime: dayjs('2023-05-08T08:33'),
  closingTime: dayjs('2023-05-07T21:16'),
  denominations: 'e-markets',
};

export const sampleWithPartialData: IUserCounterManagement = {
  id: 53351,
  totalAmount: 39170,
  openingTime: dayjs('2023-05-07T15:22'),
  closingTime: dayjs('2023-05-08T03:12'),
  denominations: 'Nevada engage',
};

export const sampleWithFullData: IUserCounterManagement = {
  id: 97688,
  totalAmount: 27214,
  notes: 'Factors networks Bacon',
  openingTime: dayjs('2023-05-07T15:33'),
  closingTime: dayjs('2023-05-07T16:13'),
  denominations: 'pixel AGP Technician',
};

export const sampleWithNewData: NewUserCounterManagement = {
  totalAmount: 78868,
  openingTime: dayjs('2023-05-07T19:56'),
  closingTime: dayjs('2023-05-08T09:10'),
  denominations: 'Persevering',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
