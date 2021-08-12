import { useCallback, useMemo, useState } from 'react';
import { InputModel } from './useModel';

/**
 * @deprecated
 */
export function useModels<T extends Record<string, any>>(initModels: T): Record<keyof T, InputModel<T[keyof T]>> {
    const modelKeys = useMemo(() => Object.keys(initModels), [initModels]);

    const modelWithValue = useCallback(
        <V>(value: V) => {
            return modelKeys.reduce((acc, key) => Object.assign(acc, { [key]: value }), {}) as Record<keyof T, V>;
        },
        [modelKeys],
    );

    const [values, setValues] = useState<T>(initModels);
    const [errors, setErrors] = useState<Record<keyof T, string>>(() => modelWithValue(''));
    const [toucheds, setToucheds] = useState<Record<keyof T, boolean>>(() => modelWithValue(false));

    const toModels: Record<keyof T, InputModel<T[keyof T]>> = useMemo(
        () =>
            modelKeys.reduce((acc, key: keyof T) => {
                return {
                    ...acc,
                    [key]: {
                        value: values[key],
                        error: errors[key],
                        touched: toucheds[key],
                        defaultValue: initModels[key],
                        name: key,
                        setValue(value: React.SetStateAction<any>) {
                            return (
                                value &&
                                setValues({
                                    [key]: typeof value !== 'function' ? value : value(values[key]),
                                } as any)
                            );
                        },
                        setError(error: React.SetStateAction<string>) {
                            return (
                                error &&
                                setErrors({
                                    [key]: typeof error !== 'function' ? error : error(errors[key]),
                                } as any)
                            );
                        },
                        setTouched(touched: React.SetStateAction<boolean>) {
                            return (
                                touched &&
                                setToucheds({
                                    [key]: typeof touched !== 'function' ? touched : touched(toucheds[key]),
                                } as any)
                            );
                        },
                    },
                };
            }, {}),
        [modelKeys, values, errors, toucheds],
    ) as Record<keyof T, InputModel<T[keyof T]>>;

    return toModels;
}
