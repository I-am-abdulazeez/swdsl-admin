import { Timestamp } from "firebase/firestore";

export interface FormState {
  drinkName: string;
  description: string;
  category: string;
  price: number;
}

export interface DrinksCategory {
  drink_id: string;
  drinkCategory: string;
}

export interface InputFieldProps {
  name: string;
  handleChange: (e: any) => void;
  value: string | number;
  placeHolder: string;
  label: string;
  isRequired: boolean;
  type?: React.HTMLInputTypeAttribute | undefined;
}

export interface SelectFieldProps extends InputFieldProps {}
export interface FileInputProps {
  file: any;
  handleFileChange: (e: any) => void;
  progress: number;
}

export interface ProductsProps {
  category:
    | "Cognac"
    | "Juice"
    | "Whisky"
    | "Non alcoholic"
    | "Red wine"
    | "Champagne"
    | "Rum"
    | "Irish cream"
    | "White wine"
    | "Gin"
    | "Sparkling wine"
    | "Brandy"
    | "Juice"
    | "Tequila"
    | "Vodka"
    | "Others";
  createdAt: Timestamp;
  description: string;
  drinkName: string;
  price: string;
  url: string;
}
