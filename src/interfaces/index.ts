import React from 'react';
import { DocumentData } from 'firebase/firestore';
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormUnregister,
} from 'react-hook-form';
import { CategoryType } from 'src/types';

export interface UploadFormState {
  drinkName: string;
  description: string;
  category: string;
  price: number;
  packsOrWholesale: boolean;
  packSize: string;
}

export interface DrinksCategory {
  drink_id: number;
  drinkCategory: CategoryType;
}

export interface FileInputProps {
  file: File | null;
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
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
  showValue?: boolean;
  isRequired: boolean;
  product?: DocumentData | null;
  unregister: UseFormUnregister<UploadFormState>;
  setValue: UseFormSetValue<UploadFormState>;
}

export interface ProgressBarProps {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}
