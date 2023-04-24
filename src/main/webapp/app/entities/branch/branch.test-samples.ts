import { IBranch, NewBranch } from './branch.model';

export const sampleWithRequiredData: IBranch = {
  id: 244,
};

export const sampleWithPartialData: IBranch = {
  id: 97926,
  name: 'Soft violet logistical',
  description: 'e-tailers',
};

export const sampleWithFullData: IBranch = {
  id: 24501,
  name: 'transmitter',
  shortName: 'superstruc',
  description: 'Denar Human Architect',
};

export const sampleWithNewData: NewBranch = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
