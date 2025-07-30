export type FormField = 'cardNumber' | 'expiryDate' | 'cvv' | 'cardName';

export interface FormData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
}

export type Errors = {
  [key in FormField]?: string;
};
