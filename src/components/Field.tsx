import React, {
  ChangeEvent,
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementType,
  FocusEvent,
  forwardRef,
  useEffect,
  useMemo,
} from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { FieldModel, ModelOptions } from '../hooks/useModel';
import PropTypes from 'prop-types';
import { useFormContext } from './Form';

type PatternTuple = [RegExp | RegExp[], string];

export interface FieldOptions<T = any> {
  model: FieldModel<T>;
  'imprint-model'?: FieldModel<T> | [FieldModel<T>, string];
  as?: ElementType;
  // validation related props

  /**
   * Makes the input required
   * set to `true` or pass an error message
   */
  required?: boolean | string;
  /**
   * Maximum number value (Only works with numeric input types)
   * Pass a number or as an array [number, error-message]
   */
  max?: number | [number, string];
  /**
   * Minimum number value (Only works with numeric input types)
   * Pass a number or as an array [number, error-message]
   */
  min?: number | [number, string];
  /**
   * Maximum character length (Only works with string input types)
   * Pass a number or as an array [number, error-message]
   */
  maxLength?: number | [number, string];
  /**
   * Minimum character length (Only works with string input types)
   * Pass a number or as an array [number, error-message]
   */
  minLength?: number | [number, string];
  /**
   * Validation regular expression that will be matched a against the 
   * value of input 
   * Pass a `RegExp` or an array of [`RegExp`, `error-message`] or
   * an array of [`RegExp[]`, `error-message`]
   */
  pattern?: RegExp | PatternTuple;
  'map-props'?: (
    props: Omit<FieldProps, 'map-props' | 'model' | 'as'>,
  ) => Record<any, any>;
  /**
   * Method for Manually validating the input, incase of doing anything 
   * extremely different with the input field
   * Should return a boolean (true|false)
   * 
   * `validate` provides the value of the input field & touched state
   */
  validate?: (value: T, touched: boolean) => boolean | [boolean, string];
  'semantic-validation'?: boolean;
}

export type SemanticValidationProps =
  | 'required'
  | 'max'
  | 'min'
  | 'maxLength'
  | 'minLength'
  | 'pattern';

export type FieldProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  SemanticValidationProps
> &
  FieldOptions;

function checkReturnValidValue(value: number | [number, string]): number {
  return Array.isArray(value) ? value[0] : value;
}

function checkReturnValidErrorMsg(value: number | [number, string], msg: string): string {
  return Array.isArray(value) ? value[1] : msg;
}

function formatPatternError(pattern: RegExp, msg?: string) {
  return msg ? msg : `value didn't match pattern ${pattern.source}`;
}

export const Field = forwardRef<HTMLInputElement | HTMLTextAreaElement, FieldProps>(
  function Field(
    {
      model: {
        value,
        setValue,
        error,
        setError,
        touched,
        setTouched,
        defaultValue,
        validations
      },
      'imprint-model': imprintModel,
      as,
      onBlur,
      onChange,
      'map-props': mapProps,
      type = 'text',
      disabled,
      ...props
    },
    ref,
  ) {

    // merging props with hook options
    // props are first priority here than comes model options
    const {
      required,
      max,
      min,
      maxLength,
      minLength,
      pattern,
      validate,
      'semantic-validation': semanticValidation = true,
      name
    }: ModelOptions = useMemo(() => ({
      required: props.required ?? validations?.required,
      max: props.max ?? validations?.max,
      min: props.min ?? validations?.min,
      maxLength: props.maxLength ?? validations?.maxLength,
      minLength: props.minLength ?? validations?.minLength,
      pattern: props.pattern ?? validations?.pattern,
      validate: props.validate ?? validations?.validate,
      'semantic-validation': props['semantic-validation'] ?? validations?.['semantic-validation'],
      name: props.name ?? validations?.name
    }), [
      props.required, validations?.required,
      props.max, validations?.max,
      props.min, validations?.min,
      props.maxLength, validations?.maxLength,
      props.minLength, validations?.minLength,
      props.pattern, validations?.pattern,
      props.validate, validations?.validate,
      props['semantic-validation'], validations?.['semantic-validation'],
      props.name, validations?.name
    ])

    // global form context for keeping track of errors/touched-fields/submission-status
    const context = useFormContext();

    useEffect(() => {
      const validated = validate?.(value, touched);
      if (!touched) return;

      const isValNum = typeof value === 'number';
      const isValStr = typeof value === 'string';

      // imprinting value matches
      if (
        imprintModel &&
        !Array.isArray(imprintModel) &&
        imprintModel.value !== value
      )
        setError(`value doesn't match`);
      else if (
        imprintModel &&
        Array.isArray(imprintModel) &&
        imprintModel[0].value !== value
      )
        setError(imprintModel[1]);
      // running user defined validation
      else if (validated !== undefined && !Array.isArray(validated) && !validated)
        setError('invalid input');
      else if (validated !== undefined && Array.isArray(validated) && !validated[0])
        setError(validated[1]);
      // validating checking required flag
      else if (required && !value)
        setError(
          typeof required === 'string'
            ? required
            : `${props.name ? props.name : 'this field'} is required`,
        );
      // max & min check
      else if (isValNum && min && value < checkReturnValidValue(min))
        setError(checkReturnValidErrorMsg(min, `minimum ${min} is allowed`));
      else if (isValNum && max && value > checkReturnValidValue(max))
        setError(checkReturnValidErrorMsg(max, `maximum ${max} is allowed`));
      // string length check
      else if (
        isValStr &&
        minLength &&
        value.length < checkReturnValidValue(minLength)
      )
        setError(
          checkReturnValidErrorMsg(
            minLength,
            `minimum ${minLength} characters`,
          ),
        );
      else if (
        isValStr &&
        maxLength &&
        value.length > checkReturnValidValue(maxLength)
      )
        setError(
          checkReturnValidErrorMsg(
            maxLength,
            `maximum ${maxLength} characters`,
          ),
        );
      // pattern matching
      else if (isValStr && pattern instanceof RegExp && !pattern.test(value))
        setError(formatPatternError(pattern));
      // only one regexp with custom message
      else if (
        isValStr &&
        Array.isArray(pattern) &&
        pattern?.[0] instanceof RegExp &&
        !pattern[0].test(value)
      )
        setError(formatPatternError(pattern[0], pattern?.[1]));
      // array of pattern with either custom message or not
      else if (isValStr && Array.isArray(pattern) && Array.isArray(pattern?.[0])) {
        const { failed, succeed } = pattern[0].reduce<
          Record<'failed' | 'succeed', RegExp[]>
        >(
          (acc, val) => {
            acc[val.test(value) ? 'succeed' : 'failed'].push(val);
            return acc;
          },
          { failed: [], succeed: [] },
        );
        // only one match is ok
        if (succeed.length === 0 && failed.length > 0)
          setError(formatPatternError(failed[0], pattern?.[1]));
        else error && setError('');
      } else {
        error && setError('');
      }
    }, [
      value,
      error,
      touched,
      required,
      min,
      max,
      maxLength,
      minLength,
      pattern,
      imprintModel,
      // will make it re validate before user submits
      context.submitting
    ]);

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

    useEffect(() => {
      if (
        imprintModel &&
        (max || min || maxLength || minLength || pattern || validate)
      )
        throw new TypeError(
          "[react-bind]: Both imprinting & validation can't be done at once. Following props `max`, `min`, `maxLength`, `minLength`, `pattern`, `validate` can't be used together with `imprint-model`",
        );
    }, [imprintModel]);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
      onChange?.(e);
      // unlocking the form from `reset` status
      if (context.reset && value === defaultValue) context.setReset(false);

      // When working with Group of Checkboxes
      if (type === "checkbox" && Array.isArray(defaultValue)) {
        if (props.value === undefined) throw new TypeError("[react-bind]: `props.value` can't be empty when using checkbox group")

        setValue(e.target.checked ? [...value, props.value] : value.filter((v: unknown) => v !== props.value))
        return;
      }

      setValue(
        e.target[type === "checkbox" ? 'checked' : 'value'],
      );

    }
    function handleBlur(e: FocusEvent<HTMLInputElement>) {
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
            min: Array.isArray(min) ? min[0].toString() : min?.toString(),
            max: Array.isArray(max) ? max[0].toString() : max?.toString(),
            minLength: Array.isArray(minLength)
              ? minLength[0].toString()
              : minLength?.toString(),
            maxLength: Array.isArray(maxLength)
              ? maxLength[0].toString()
              : maxLength?.toString(),
            pattern:
              Array.isArray(pattern) && !Array.isArray(pattern[0])
                ? pattern[0].source
                : pattern instanceof RegExp
                  ? pattern?.source
                  : undefined,
          }
          : {},
      [required, min, max, minLength, maxLength, pattern],
    );

    const mapped = useMemo(
      () => ({
        error,
        disabled: isDisabled,
        ...semanticValidationProps,
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
      [error, props, as, required, max, min, maxLength, minLength, pattern, type],
    );

    const Component = as ?? 'input';

    return (
      <Component
        {...mapped}
        defaultChecked={Array.isArray(defaultValue) ? defaultValue.includes(props.value) : props.value === defaultValue}
        defaultValue={!["radio", "checkbox"].includes(type) ? defaultValue : undefined}
        onChange={handleChange}
        onBlur={handleBlur}
        type={type}
        ref={ref}
        name={name}
      />
    );
  },
);

/** @internal */
export const modelShape = PropTypes.shape({
  error: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  touched: PropTypes.bool.isRequired,
  defaultValue: PropTypes.any.isRequired,
  setValue: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  setTouched: PropTypes.func.isRequired,
});

Field.propTypes = {
  as: PropTypes.elementType as any,
  model: modelShape.isRequired as any,
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.array]) as any,
  min: PropTypes.oneOfType([PropTypes.number, PropTypes.array]) as any,
  maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.array]) as any,
  minLength: PropTypes.oneOfType([PropTypes.number, PropTypes.array]) as any,
  pattern: PropTypes.oneOfType([PropTypes.instanceOf(RegExp), PropTypes.array]) as any,
  'imprint-model': modelShape as any,
  validate: PropTypes.func,
  'semantic-validation': PropTypes.bool,
};


