import { Dispatch, SetStateAction, useState } from 'react';

export interface InputModel<T> {
    value: T;
    setValue: Dispatch<SetStateAction<T>>;
    error: string;
    setError: Dispatch<SetStateAction<string>>;
    touched: boolean;
    setTouched: Dispatch<SetStateAction<boolean>>;
}

export function useModel<T>(defaultValue: T) {
    const [value, setValue] = useState<T>(defaultValue);
    const [error, setError] = useState<string>('');
    const [touched, setTouched] = useState<boolean>(false);

    return { value, setValue, error, setError, touched, setTouched };
}
