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
    ) => void;
    states?: FormShadowContext;
}

/**
 * Groups `Input`s together & handles form submission & reset
 */
const Form = forwardRef<HTMLFormElement, FormProps>(function Form(
    { as, onSubmit, onBlur, states, children, ...props },
    ref,
) {
    const Component = as ?? 'form';
    const formRef = useRef<HTMLFormElement>(null);
    const { errors, reset, submitting, setErrors, setReset, setSubmitting } =
        states ?? useForm();

    const [touched, setTouched] = useState<boolean>(false);

    console.log({ touched });

    // exposing ref for keeping usability of forwarded ref
    useImperativeHandle<HTMLFormElement | null, HTMLFormElement | null>(
        ref,
        () => formRef.current,
    );

    function resetForm() {
        formRef.current?.reset();
        setReset(true);
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!errors && !submitting && touched) {
            setSubmitting(true);
            onSubmit?.(e, { errors, reset }, { resetForm, setSubmitting, setErrors });
        }
    }

    function handleBlur(e: FocusEvent<HTMLFormElement>) {
        onBlur?.(e);
        !touched && setTouched(true);
    }

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

export default Form;
