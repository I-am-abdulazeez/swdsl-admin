export interface FormState {
  drinkName: string;
  description: string;
  category: string;
  price: string;
}

export interface DrinksCategory {
  drink_id: string;
  drinkCategory: string;
}

export interface InputFieldProps {
  name: string;
  handleChange: (e: any) => void;
  value: string;
  placeHolder: string;
  label: string;
}

export interface SelectFieldProps extends InputFieldProps {}
export interface FileInputProps {
  file: any;
  handleFileChange: (e: any) => void;
  progress: number;
}
