import React, {
    ChangeEvent,
    ComponentPropsWithoutRef,
    ComponentPropsWithRef,
    ComponentType,
    FocusEvent,
    forwardRef,
    useEffect,
    useMemo,
} from 'react';
import { flushSync } from 'react-dom';
import { InputModel } from '../hooks/useModel';
import PropTypes from 'prop-types';
import { useFormContext } from './Form';

type PatternTuple = [RegExp | RegExp[], string];

export interface InputProps
    extends Omit<
        ComponentPropsWithoutRef<'input'>,
        'required' | 'max' | 'min' | 'maxLength' | 'minLength' | 'pattern'
    > {
    model: InputModel<any>;
    as?: ComponentType<ComponentPropsWithRef<'input'>>;
    required?: boolean | string;
    max?: number | [number, string];
    min?: number | [number, string];
    maxLength?: number | [number, string];
    minLength?: number | [number, string];
    pattern?: RegExp | PatternTuple;
    'map-props'?: (props: Omit<InputProps, 'map-props' | 'model' | 'as'>) => Record<any, any>;
    validate?: <T = any>(value: T, touched: boolean) => boolean | [boolean, string];
}

function checkReturnValidValue(value: number | [number, string]): number {
    return Array.isArray(value) ? value[0] : value;
}

function checkReturnValidErrorMsg(value: number | [number, string], msg: string): string {
    return Array.isArray(value) ? value[1] : msg;
}

function formatPatternError(pattern: RegExp, msg?: string) {
    return msg ? msg : `value didn't match pattern ${pattern.source}`;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
    {
        model: { value, setValue, error, setError, touched, setTouched, defaultValue },
        as,
        required,
        'map-props': mapProps,
        max,
        min,
        maxLength,
        minLength,
        onChange,
        onBlur,
        pattern,
        type = 'text',
        validate,
        ...props
    },
    ref,
) {
    const context = useFormContext();

    useEffect(() => {
        const validated = validate?.(value, touched);

        if (!touched) return;

        const isValNum = typeof value === 'number';
        const isValStr = typeof value === 'string';
        // running user defined validation
        if (validated !== undefined && !Array.isArray(validated) && !validated) setError('invalid input');
        else if (validated !== undefined && Array.isArray(validated) && !validated[0]) setError(validated[1]);
        // validating checking required flag
        else if (required && !value)
            setError(typeof required === 'string' ? required : `${props.name ? props.name : 'this field'} is required`);
        // max & min check
        else if (isValNum && min && value < checkReturnValidValue(min))
            setError(checkReturnValidErrorMsg(min, `minimum ${min} is allowed`));
        else if (isValNum && max && value > checkReturnValidValue(max))
            setError(checkReturnValidErrorMsg(max, `maximum ${max} is allowed`));
        // string length check
        else if (isValStr && minLength && value.length < checkReturnValidValue(minLength))
            setError(checkReturnValidErrorMsg(minLength, `minimum ${minLength} characters`));
        else if (isValStr && maxLength && value.length > checkReturnValidValue(maxLength))
            setError(checkReturnValidErrorMsg(maxLength, `maximum ${maxLength} characters`));
        // pattern matching
        else if (isValStr && pattern instanceof RegExp && !pattern.test(value)) setError(formatPatternError(pattern));
        // only one regexp with custom message
        else if (isValStr && Array.isArray(pattern) && pattern?.[0] instanceof RegExp && !pattern[0].test(value))
            setError(formatPatternError(pattern[0], pattern?.[1]));
        // array of pattern with either custom message or not
        else if (isValStr && Array.isArray(pattern) && Array.isArray(pattern?.[0])) {
            const { failed, succeed } = pattern[0].reduce<Record<'failed' | 'succeed', RegExp[]>>(
                (acc, val) => {
                    acc[val.test(value) ? 'succeed' : 'failed'].push(val);
                    return acc;
                },
                { failed: [], succeed: [] },
            );
            // only one match is ok
            if (succeed.length === 0 && failed.length > 0) setError(formatPatternError(failed[0], pattern?.[1]));
            else error && setError('');
        } else {
            error && setError('');
        }
    }, [value, error, touched, required, min, max, maxLength, minLength, pattern]);

    useEffect(() => {
        context.setErrors(!!(error && !context.errors));
    }, [error]);

    useEffect(() => {
        if (context.reset) {
            flushSync(() => {
                setValue(defaultValue);
                setTouched(false);
                setError('');
            });
        }
    }, [context.reset]);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        onChange?.(e);
        // unlocking the form from `reset` status
        if (context.reset && value === defaultValue) context.setReset(false);
        setValue(e.target[['checkbox', 'radio'].includes(type) ? 'checked' : 'value']);
    }
    function handleBlur(e: FocusEvent<HTMLInputElement>) {
        onBlur?.(e);
        setTouched(true);
    }

    const mapped = useMemo(
        () => ({
            error,
            ...(as && mapProps
                ? mapProps({
                      required,
                      max,
                      min,
                      maxLength,
                      minLength,
                      onChange,
                      onBlur,
                      pattern,
                      type,
                      validate,
                      ...props,
                  })
                : props),
        }),
        [error, props, as, required, max, min, maxLength, minLength, pattern, type, name],
    );

    const Component = as ?? 'input';

    return <Component {...mapped} onChange={handleChange} onBlur={handleBlur} type={type} ref={ref} />;
});

Input.propTypes = {
    model: PropTypes.object.isRequired as any,
    required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    max: PropTypes.oneOfType([PropTypes.number, PropTypes.array]) as any,
    min: PropTypes.oneOfType([PropTypes.number, PropTypes.array]) as any,
    maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.array]) as any,
    minLength: PropTypes.oneOfType([PropTypes.number, PropTypes.array]) as any,
    pattern: PropTypes.oneOfType([PropTypes.instanceOf(RegExp), PropTypes.array]) as any,
};

export default Input;
