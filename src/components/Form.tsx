import React, {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ComponentType,
  Dispatch,
  forwardRef,
  SetStateAction,
  useContext,
  useImperativeHandle,
  useRef,
  FormEvent,
  useState,
  FocusEvent,
  useCallback,
} from 'react';
import { useForm } from '../hooks/useForm';

export interface FormShadowContext {
  errors: boolean;
  setErrors: Dispatch<SetStateAction<boolean>>;
  reset: boolean;
  setReset: Dispatch<SetStateAction<boolean>>;
  submitting: boolean;
  setSubmitting: Dispatch<SetStateAction<boolean>>;
}

// form's context
const formContext = React.createContext<FormShadowContext>({
  errors: false,
  setErrors() {
    return;
  },
  reset: false,
  setReset() {
    return;
  },
  submitting: false,
  setSubmitting() {
    return;
  },
});

/**
 * used for retrieving the Form context
 */
export function useFormContext(): FormShadowContext {
  const context = useContext(formContext);
  return context;
}
const FormProvider = formContext.Provider;

export interface FormBagMethods
  extends Pick<FormShadowContext, 'setSubmitting' | 'setErrors'> {
  resetForm(): void;
}

export type FormBagValues = Pick<FormShadowContext, 'reset' | 'errors'>;

export interface FormProps extends Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'> {
  as?: ComponentType<ComponentPropsWithRef<'form'>>;
  onSubmit?: (
    e: FormEvent<HTMLFormElement>,
    v: FormBagValues,
    c: FormBagMethods,
  ) => Promise<void> | void;
  states?: FormShadowContext;
}

/**
 * Groups `Input`s together & handles form submission & reset
 */
export const Form = forwardRef<HTMLFormElement, FormProps>(function Form(
  { as, onSubmit, onBlur, states, children, ...props },
  ref,
) {
  const Component = as ?? 'form';
  const formRef = useRef<HTMLFormElement>(null);
  const fallback = useForm();
  const { errors, reset, submitting, setErrors, setReset, setSubmitting } =
    states ?? fallback

  const [touched, setTouched] = useState<boolean>(false);

  // exposing ref for keeping usability of forwarded ref
  useImperativeHandle<HTMLFormElement | null, HTMLFormElement | null>(
    ref,
    () => formRef.current,
  );

  const resetForm = useCallback(() => {
    formRef.current?.reset();
    setReset(true);
  }, [setErrors, formRef.current?.reset])

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!errors && !submitting && touched) {
        setSubmitting(true);
        // casting to promise incase using promise
        return await Promise.resolve(onSubmit?.(e, { errors, reset }, { resetForm, setSubmitting, setErrors }));
      }
    } catch (error) {
      console.log(`[react-binden]: Form submission error!\n${error}`)
    }
  }, [
    errors, submitting, reset, touched,
    onSubmit, resetForm, setSubmitting, setErrors
  ])

  const handleBlur = useCallback((e: FocusEvent<HTMLFormElement>) => {
    onBlur?.(e);
    !touched && setTouched(true);
  }, [touched, setTouched, onBlur])

  return (
    <FormProvider
      value={{ errors, setErrors, reset, setReset, submitting, setSubmitting }}
    >
      <Component
        {...props}
        onSubmit={handleSubmit}
        onBlur={handleBlur}
        ref={formRef}
      >
        {children}
      </Component>
    </FormProvider>
  );
});

