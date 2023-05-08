import dayjs from 'dayjs/esm';
import { IUser } from 'app/entities/user/user.model';

export interface IStockSellerInfo {
  id: number;
  distributorName?: string | null;
  paymentDate?: dayjs.Dayjs | null;
  totalAmount?: number | null;
  user?: Pick<IUser, 'id' | 'login'> | null;
}

export type NewStockSellerInfo = Omit<IStockSellerInfo, 'id'> & { id: null };
