import React, { ComponentPropsWithRef, ComponentType, forwardRef } from 'react';
import Field, { FieldOptions } from './Field';

interface TextareaProps extends Omit<FieldOptions, 'as'> {
    as?: ComponentType<ComponentPropsWithRef<'textarea'>>;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
    props,
    ref,
) {
    return <Field as="textarea" {...props} ref={ref} />;
});
export default Textarea;
