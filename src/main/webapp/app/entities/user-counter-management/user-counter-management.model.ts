import dayjs from 'dayjs/esm';
import { IUser } from 'app/entities/user/user.model';
import { IBranch } from 'app/entities/branch/branch.model';

export interface IUserCounterManagement {
  id: number;
  totalAmount?: number | null;
  notes?: string | null;
  openingTime?: dayjs.Dayjs | null;
  closingTime?: dayjs.Dayjs | null;
  denominations?: any | null;
  user?: Pick<IUser, 'id' | 'login'> | null;
  branch?: Pick<IBranch, 'id' | 'name'> | null;
}

export type NewUserCounterManagement = Omit<IUserCounterManagement, 'id'> & { id: null };
