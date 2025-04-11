export type DemoFormState = {
  name: string;
  chooseDate: Date | null;
  favoriteSnacks: string[];
  isHungry: boolean;
  state: { name: ''; abbreviation: '' } | null;
};

export type PersonalFormState = {
  name: string;
  email: string;
};

export type AddressFormState = {
  street: string;
  city: string;
  state: {
    name: string;
    abbreviation: string;
  } | null;
};

export type PaymentFormState = {
  cardNumber: string;
  expirationDate: Date | null;
};

export type WizardDemoFormState = {
  personal: PersonalFormState;
  address: AddressFormState;
  payment: PaymentFormState;
};
