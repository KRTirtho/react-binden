import { useState } from 'react';
import { FormShadowContext } from '../components/Form';

/**
 * State uplifter for the Form incase anyone needs explicit access to 
 * `FormState`
 * 
 * But this hook doesn't give access to every input fields
 * {value, error, touched} state
 * 
 * It only provides the global `boolean` states for {error, reset, 
 * submitting}
 */
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
