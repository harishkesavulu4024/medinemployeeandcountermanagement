import { IAddress } from 'app/entities/address/address.model';

export interface IBranch {
  id: number;
  name?: string | null;
  shortName?: string | null;
  description?: string | null;
  address?: Pick<IAddress, 'id'> | null;
}

export type NewBranch = Omit<IBranch, 'id'> & { id: null };
