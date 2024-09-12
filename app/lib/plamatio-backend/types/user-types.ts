export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type Address = {
  id: number;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  userId: string;
  primary: boolean;
};

export type NewUser = {
  firstName: string;
  lastName: string;
  refId: string;
};

export type NewAddress = {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  userId: string;
};

export type AddressesCollection = {
  data: Address[];
};

export type DeleteAddressParams = {
  addressId: number;
  userId: string;
};
