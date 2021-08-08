import React, {
    ChangeEvent,
    ComponentPropsWithoutRef,
    FocusEvent,
    forwardRef,
    useEffect,
} from 'react';
import { InputModel } from '../hooks/useModel';
import PropTypes from 'prop-types';

export interface InputProps
    extends Omit<
        ComponentPropsWithoutRef<'input'>,
        'required' | 'max' | 'min' | 'maxLength' | 'minLength' | 'pattern'
    > {
    model: InputModel<any>;
    required?: boolean | string;
    max?: number | [number, string?];
    min?: number | [number, string];
    maxLength?: number | [number, string?];
    minLength?: number | [number, string?];
    pattern?: RegExp | [RegExp, string?] | [RegExp, string?][];
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
    {
        model: { value, setValue, error, setError, touched, setTouched },
        required,
        max,
        min,
        maxLength,
        minLength,
        onChange,
        onBlur,
        pattern,
        type = 'text',
        ...props
    },
    ref,
) {
    useEffect(() => {
        return void 0;
    }, [value, error, touched, required, min, max, maxLength, minLength, pattern]);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        onChange?.(e);
        setValue(e.target[['checkbox', 'radio'].includes(type) ? 'checked' : 'value']);
    }
    function handleBlur(e: FocusEvent<HTMLInputElement>) {
        onBlur?.(e);
        setTouched(true);
    }

    return <input {...props} onChange={handleChange} onBlur={handleBlur} type={type} ref={ref} />;
});

Input.propTypes = {
    model: PropTypes.object.isRequired as any,
    required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    max: PropTypes.oneOfType([PropTypes.number, PropTypes.array]) as any,
    min: PropTypes.oneOfType([PropTypes.number, PropTypes.array]) as any,
    maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.array]) as any,
    minLength: PropTypes.oneOfType([PropTypes.number, PropTypes.array]) as any,
    pattern: PropTypes.oneOfType([PropTypes.instanceOf(RegExp), PropTypes.array, PropTypes.arrayOf(PropTypes.array)]),
};

export default Input;
