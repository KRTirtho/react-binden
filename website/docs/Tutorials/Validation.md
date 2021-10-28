---
id: validation
title: Validation
sidebar_position: 1
---

React Binden provides form validation out of the box & doesn't need any 3rd party validation library (you can use if you want). It uses all the semantic HTML validation attributes e.g.

-   `min`, `max` (for numeric values)
-   `minLength`, `maxLength` (for string values)
-   `pattern` (through regex)
-   `required`

All of these attributes/props can be used just like the vanilla input's counterpart. But it has an option to pass a custom error message with all those attributes

Basic example of `Input`

```jsx
export function Example() {
    const user = useModel('');

    return (
        <Input
            model={user}
            maxLength={30}
            minLength={[5, 'Minimum 5 characters']}
            required
        />
    );
}
```

If these validation props aren't enough you can use the `validate` method to take the full control of validation. The value & the touched state is passed as parameters to callback

Custom validation example

```jsx
export function Example() {
    const model = useModel('');

    return (
        <Input
            model={model}
            placeholder="Write something good"
            validate={(value, touched) => {
                // you can use user.value & user.touched too
                return value.toLowerCase().includes('react');
            }}
        />
    );
}
```

:::info
You can use [`useValidatorChain`](/docs/Hooks/useValidatorChain) hook to reduce down multiple `validate` functions to one single `validate` method that can be pass as prop
:::

You can use `pattern` to provide custom validation regular expressions for validating the input value. React Binden also provides some useful Regular Expressions out of the box named `regex`

Here's an example of using `pattern` for email validation

```jsx
import { regex, useModel, Input } from 'react-binden';

export function Login() {
    const email = useModel('');

    return (
        <Input
            type="email"
            model={email}
            pattern={[regex.email, 'Should be a valid email']}
            required
        />
    );
}
```

React Binden _follows & recommends schemantic HTML_. So by default, all the validation props are provided as the actual field's attributes too. That means, not only React Binden but also builtin browser's validator will validate the form, leading to a much more secure form submission flow. But this can be turned off by setting `semantic-validation` to `false`
