---
id: use-validator-chain
title: useValidatorChain
sidebar_position: 3
---

`Input`, `Textarea` & `Select` all have the `validate` prop. It enables one to validate the field manually. But there might be a need for executing multiple validation functions. To make this process easier `useValidatorChain` is provided. It reduces down all the validation function provided as arguments to a single `validate` function. It increases the reusability of multiple `validate` functions

Here's an example

```jsx
// some demo validation functions
function checkHasReact(value) {
    return value.toLowerCase().includes('react');
}

function no39(value) {
    return [value !== 39, "Value shouldn't  be 39"];
}

const validate = useValidatorChain(checkHasReact, no39);

const model = useModel('', {
    // you can provide `validate` function in useModel's options too
    // validate: validate
});

return <Input model={model} validate={validate} />;
```
