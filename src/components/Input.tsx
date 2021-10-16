import React, { ComponentPropsWithRef, ComponentType, forwardRef } from 'react';
import { Field, FieldProps } from './Field';

export interface InputProps extends Omit<FieldProps, 'as'> {
    as?: ComponentType<ComponentPropsWithRef<'input'>>;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {
    return <Field {...props} ref={ref} />;
});

