import { Dispatch, SetStateAction, useState } from 'react';
import { FieldOptions, SemanticValidationProps } from '../main';

export type ModelOptions = Pick<FieldOptions, SemanticValidationProps | "validate" | "semantic-validation"> & { name?: string; };

export interface FieldModel<T> {
  value: T;
  setValue: Dispatch<SetStateAction<T>>;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
  touched: boolean;
  setTouched: Dispatch<SetStateAction<boolean>>;
  defaultValue: T;
  validations?: ModelOptions;
}

/**
 * Model hook which creates required states & options for the component
 * 
 * Accepts a default value (optional)
 * 
 * And options {'required', 'max', 'min', 'maxLength', 'minLength', 
 * 'pattern', 'validate', 'semantic-validation', 'name'} (optional)
 * 
 * **The Input & TextArea components also has props similar to the 
 * hook-options & will override the hook's option as Component props 
 * are first prior**
 */
export function useModel<T>(defaultValue: T, options?: ModelOptions): FieldModel<T> {
  const [value, setValue] = useState<T>(defaultValue);
  const [error, setError] = useState<string>('');
  const [touched, setTouched] = useState<boolean>(false);

  return { defaultValue, value, setValue, error, setError, touched, setTouched, validations: options };
}
