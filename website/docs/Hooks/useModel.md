---
id: use-model
title: useModel
sidebar_position: 1
---

React Binden is inspired from Vue's `v-bind` but how it works is a lot different though it looks kind of same. `useModel` hook is used for connecting the state with a React Binden Field.

`useModel` is just a simple hook that provides necessary state for `Field`, `Input`, `Textarea` & `Select`

### Importing

It's exported from the parent package `react-binden`. So it can be imported easily

```js
import { useModel } from 'react-model';
```

### Parameters

It takes a `defaultValue` parameter which is required. And another optional `options` parameter which takes an object as an alternative way to provide validation prop to binding Field/Input/Select/Textarea component. It accepts the following properties (optional):

| Property            | Type                                                           | Default     |
| ------------------- | -------------------------------------------------------------- | ----------- |
| name                | `string`                                                       | `undefined` |
| max                 | `number` \| [`number`, `string`]                               | `undefined` |
| min                 | `number` \| [`number`, `string`]                               | `undefined` |
| maxLength           | `number` \| [`number`, `string`]                               | `undefined` |
| minLength           | `number` \| [`number`, `string`]                               | `undefined` |
| pattern             | `RegExp` \| [`RegExp`\|`RegExp`[], `string`]                   | `undefined` |
| required            | `boolean` \| `string`                                          | `undefined` |
| validate            | `(value: T, touched: boolean) => boolean \| [boolean, string]` | `undefined` |
| semantic-validation | `boolean`                                                      | `true`      |

### List of returned properties:

`useModel` returns all the required states & state setters

States:

-   value
-   defaultValue
-   error
-   touched

State setters:

-   setValue
-   setError
-   setTouched

### Using `useModel`

```jsx
import { useModel } from 'react-binden';

export function Example() {
    const model = useModel('', {
        name: 'some-field',
        max: 20,
        min: [5, 'minimum 5'],
        maxLength: 20,
        minLength: 5,
        pattern: regex.email,
        required: true,
        validate: (_value, _touched) => true,
        'semantic-validation': true,
    });

    useEffect(() => {
        // accessing all the states/properties
        model.value;
        model.error;
        model.touched;
        model.default;
        model.validations;

        // executing all the methods
        model.setValue('Some value');
        model.setError('Some Error');
        model.setTouched(true);
    }, []);

    return (/*... other stuff*/)
}
```
