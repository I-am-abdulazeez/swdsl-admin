import { Timestamp } from 'firebase/firestore';
import React, { ChangeEvent } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { CategoryType } from 'src/types';

export interface UploadFormState {
  drinkName: string;
  description: string;
  category: string;
  price: number;
}

export interface DrinksCategory {
  drink_id: string;
  drinkCategory: CategoryType;
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
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export interface ProductsProps {
  category: CategoryType;
  createdAt: Timestamp;
  description: string;
  drinkName: string;
  price: number;
  url: string;
}

export interface QueryClientWrapperProps {
  children: React.ReactNode;
}

export interface Admin {
  email: string;
  password: string;
}

export interface FormDetailsProps {
  register: UseFormRegister<UploadFormState>;
  file: File | null;
  progress: number;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}
