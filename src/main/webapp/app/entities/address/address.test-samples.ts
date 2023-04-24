import { IAddress, NewAddress } from './address.model';

export const sampleWithRequiredData: IAddress = {
  id: 88754,
  addressLine1: 'Bulgarian application Avon',
  street: 'Brown Turnpike',
  state: 'parsing bleeding-edge Colorado',
  country: 'Luxembourg',
};

export const sampleWithPartialData: IAddress = {
  id: 83280,
  addressLine1: 'Mississippi Persevering',
  street: 'Balistreri Flat',
  city: 'San Juan',
  state: 'Focused Intelligent District',
  country: 'Panama',
};

export const sampleWithFullData: IAddress = {
  id: 15314,
  addressLine1: 'FTP',
  street: 'Mraz Stream',
  city: 'Reecemouth',
  state: 'intranet',
  country: 'China',
};

export const sampleWithNewData: NewAddress = {
  addressLine1: 'Salad dynamic Birr',
  street: 'Robb Lane',
  state: 'bus',
  country: 'Djibouti',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
