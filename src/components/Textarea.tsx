import React, { ComponentPropsWithRef, ComponentType, forwardRef } from 'react';
import { Field, FieldOptions } from './Field';

interface TextareaProps extends Omit<FieldOptions, 'as' | 'pattern'> {

  as?: ComponentType<ComponentPropsWithRef<'textarea'>>;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  props,
  ref,
) {
  return <Field as="textarea" {...props} ref={ref} />;
});
