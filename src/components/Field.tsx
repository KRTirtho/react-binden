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
import { FieldModel } from '../hooks/useModel';
import PropTypes from 'prop-types';
import { useFormContext } from './Form';

type PatternTuple = [RegExp | RegExp[], string];

export interface FieldOptions {
  model: FieldModel<any>;
  'imprint-model'?: FieldModel<any> | [FieldModel<any>, string];
  as?: ElementType;
  required?: boolean | string;
  max?: number | [number, string];
  min?: number | [number, string];
  maxLength?: number | [number, string];
  minLength?: number | [number, string];
  pattern?: RegExp | PatternTuple;
  'map-props'?: (
    props: Omit<FieldProps, 'map-props' | 'model' | 'as'>,
  ) => Record<any, any>;
  validate?: <T = any>(value: T, touched: boolean) => boolean | [boolean, string];
  'semantic-validation'?: boolean;
}

type SemanticValidationProps =
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
      },
      'imprint-model': imprintModel,
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
      disabled,
      validate,
      'semantic-validation': semanticValidation = true,
      ...props
    },
    ref,
  ) {
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
      setValue(
        e.target[['checkbox', 'radio'].includes(type) ? 'checked' : 'value'],
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
            required: typeof required === 'boolean' ? required : !!required,
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
        onChange={handleChange}
        onBlur={handleBlur}
        type={type}
        ref={ref}
      />
    );
  },
);

const modelShape = PropTypes.shape({
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


