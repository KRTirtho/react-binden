import React, { ChangeEvent, ComponentProps, ComponentPropsWithoutRef, FocusEvent, forwardRef, useMemo, useEffect } from "react"
import { unstable_batchedUpdates } from "react-dom"
import { ModelOptions } from "../hooks/useModel"
import { FieldOptions, modelShape, SemanticValidationProps } from "./Field"
import { useFormContext } from "./Form"
import PropTypes from "prop-types"

export interface SelectOptions<T = any> extends Pick<FieldOptions<T>, "as" | "required" | "semantic-validation" | "model" | "validate"> {
  'map-props'?: (
    props: Omit<SelectProps, 'map-props' | 'model' | 'as'>,
  ) => Record<string | number, unknown>;
}

export type SelectProps = SelectOptions & Omit<ComponentPropsWithoutRef<"select">, "required">

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select({ as,
  model: {
    validations,
    value,
    setError,
    error,
    defaultValue,
    setTouched,
    setValue,
    touched
  },
  onChange,
  onBlur,
  disabled,
  "map-props": mapProps,
  ...props
}, ref) {

  const {
    required,
    validate,
    'semantic-validation': semanticValidation = true,
  }: ModelOptions = useMemo(() => ({
    required: props.required ?? validations?.required,
    validate: props.validate ?? validations?.validate,
    'semantic-validation': props['semantic-validation'] ?? validations?.['semantic-validation'],
  }), [
    props.required, validations?.required,
    props.validate, validations?.validate,
    props['semantic-validation'], validations?.['semantic-validation'],
  ])

  // global form context for keeping track of errors/touched-fields/submission-status
  const context = useFormContext();

  useEffect(() => {
    const validated = validate?.(value, touched);
    if (!touched) return;

    // running user defined validation
    if (validated !== undefined && !Array.isArray(validated) && !validated)
      setError('invalid input');
    else if (validated !== undefined && Array.isArray(validated) && !validated[0])
      setError(validated[1]);

    else if (required && !value)
      setError(
        typeof required === 'string'
          ? required
          : `${props.name ? props.name : 'this field'} is required`,
      );
  }, [
    touched,
    required,
    value,
    // will make it re validate before user submits
    context.submitting
  ])

  useEffect(() => {
    // changing global errors
    context.setErrors(!!(error && !context.errors));
  }, [error]);

  useEffect(() => {
    if (context.reset) {
      unstable_batchedUpdates(() => {
        setValue(defaultValue);
        setTouched(false);
        setError('');
      });
    }
  }, [context.reset]);

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    onChange?.(e);
    // unlocking the form from `reset` status
    if (context.reset && value === defaultValue) context.setReset(false);

    setValue(e.target.value);
  }

  function handleBlur(e: FocusEvent<HTMLSelectElement>) {
    onBlur?.(e);
    !touched && setTouched(true);
  }

  const isDisabled = disabled ?? context.submitting;

  const semanticValidationProps = useMemo<
    | Pick<ComponentProps<'input'>, SemanticValidationProps>
    | Record<string, unknown>
  >(
    () =>
      semanticValidation
        ? {
          required: !!required,
        }
        : {},
    [required],
  );

  const mapped = useMemo(
    () => ({
      error,
      disabled: isDisabled,
      ...semanticValidationProps,
      ...(as && mapProps
        ? mapProps({
          required,
          validate,
          ...props,
        })
        : props),
    }),
    [error, props, as, required],
  );

  const Component = as ?? 'select';


  return (
    <Component
      {...mapped}
      defaultValue={defaultValue}
      onChange={handleChange}
      onBlur={handleBlur}
      ref={ref}
    />
  )
})

Select.propTypes = {
  as: PropTypes.elementType as any,
  model: modelShape.isRequired as any,
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  validate: PropTypes.func,
  'semantic-validation': PropTypes.bool,
};
