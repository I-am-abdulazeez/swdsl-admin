import { DocumentData, Timestamp } from 'firebase/firestore';

export type CategoryType =
  | 'Cognac'
  | 'Juice'
  | 'Whisky'
  | 'Non alcoholic'
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
  | 'Others';

export type UploadImageParams = {
  file: File | null;
  progress: number;
  setUploadLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  setCreatedAt: React.Dispatch<React.SetStateAction<Timestamp | null>>;
};

export type ProductType = {
  product: DocumentData | undefined;
}
