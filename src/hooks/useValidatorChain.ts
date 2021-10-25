export type ValidatorFunction<T> = (value: T, touched: boolean) => boolean | [boolean, string]

/**
 * An utility hook which eases the way to use multiple validators at once
 * 
 * It's a reducer for multiple `validate` function
 */
export function useValidatorChain<T>(...validators: ValidatorFunction<T>[]): ValidatorFunction<T> {
  return (value, touched) => {
    let errMsg = "";
    const isValid = validators.every(validate => {
      const validated = validate(value, touched)
      if (Array.isArray(validated)) {
        if (validated[0] === false) {
          errMsg = validated[1];
        }
        return validated[0]
      }
      return validated;
    })
    if (!errMsg) return isValid
    return [isValid, errMsg]
  }
}