import { Timestamp } from "firebase/firestore";
import { ChangeEvent } from "react";

export interface FormState {
  drinkName: string;
  description: string;
  category: string;
  price: number;
}

export interface NewFormState extends FormState {
  url: string;
}

export interface DrinksCategory {
  drink_id: string;
  drinkCategory: string;
}

export interface InputFieldProps {
  name: string;
  handleChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => void;
  value: string | number;
  placeHolder: string;
  label: string;
  isRequired: boolean;
  type?: React.HTMLInputTypeAttribute | undefined;
}

export interface SelectFieldProps extends InputFieldProps {}
export interface FileInputProps {
  file: File | null;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
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
  price: number;
  url: string;
}

export interface QueryCllientWrapperProps {
  children: React.ReactNode;
}
