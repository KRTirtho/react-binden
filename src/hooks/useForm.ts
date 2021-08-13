import { useState } from 'react';
import { FormShadowContext } from '../components/Form';

export function useForm(): FormShadowContext {
    const [errors, setErrors] = useState<boolean>(false);
    const [reset, setReset] = useState<boolean>(false);
    const [submitting, setSubmitting] = useState<boolean>(false);

    return {
        errors,
        reset,
        setErrors,
        setReset,
        setSubmitting,
        submitting,
    };
}
