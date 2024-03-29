import { DocumentData, Timestamp } from 'firebase/firestore';

export type CategoryType =
  | 'Cognac'
  | 'Juice'
  | 'Whisky'
  | 'Red wine'
  | 'Champagne'
  | 'Rum'
  | 'Irish cream'
  | 'White wine'
  | 'Gin'
  | 'Sparkling wine'
  | 'Brandy'
  | 'Juice'
  | 'Tequila'
  | 'Vodka'
  | 'Whiskey'
  | 'Others';

export type UploadImageParams = {
  file: File | null;
  progress: number;
  setUploadLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  setCreatedAt?: React.Dispatch<React.SetStateAction<Timestamp | null>>;
};

export type ProductParams = {
  id: string;
};

export type Product = {
  drinkName: string;
  description: string;
  category: string;
  price: number;
  url: string;
  createdAt: Timestamp | null;
  packsOrWholesale?: boolean;
  packSize?: string;
};

export type ProductType = {
  product: DocumentData | null;
};
