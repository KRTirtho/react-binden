import React, {
    ComponentPropsWithoutRef,
    ComponentPropsWithRef,
    ComponentType,
    Dispatch,
    forwardRef,
    SetStateAction,
    useContext,
    useState,
    useImperativeHandle,
    useRef,
    FormEvent,
} from 'react';

interface FormShadowContext {
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

export function useFormContext(): FormShadowContext {
    const context = useContext(formContext);
    return context;
}
const FormProvider = formContext.Provider;

export interface FormBagMethods extends Pick<FormShadowContext, 'setSubmitting' | 'setErrors'> {
    resetForm(): void;
}

export type FormBagValues = Pick<FormShadowContext, 'submitting' | 'reset' | 'errors'>;

export interface FormProps extends Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'> {
    as?: ComponentType<ComponentPropsWithRef<'form'>>;
    onSubmit?: (e: FormEvent<HTMLFormElement>, v: FormBagValues, c: FormBagMethods) => void;
}

const Form = forwardRef<HTMLFormElement, FormProps>(function Form({ as, onSubmit, children, ...props }, ref) {
    const Component = as ?? 'form';
    const [errors, setErrors] = useState<boolean>(false);
    const [reset, setReset] = useState<boolean>(false);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement>(null);

    useImperativeHandle<HTMLFormElement | null, HTMLFormElement | null>(ref, () => formRef.current);

    function resetForm() {
        formRef.current?.reset();
        setReset(true);
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        onSubmit?.(e, { errors, submitting, reset }, { resetForm, setSubmitting, setErrors });
    }

    return (
        <FormProvider value={{ errors, setErrors, reset, setReset, submitting, setSubmitting }}>
            <Component {...props} onSubmit={handleSubmit} ref={formRef}>
                {children}
            </Component>
        </FormProvider>
    );
});

export default Form;
