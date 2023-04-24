export interface IAddress {
  id: number;
  addressLine1?: string | null;
  street?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
}

export type NewAddress = Omit<IAddress, 'id'> & { id: null };
