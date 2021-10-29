---
id: 3rd-party-ui-libraries
title: Integrate with UI Component Libraries/Frameworks
sidebar_position: 3
---

React Binden is one of a kind React library that doesn't have compatibility issues with other UI Component libraries/frameworks. It's fairly easy to integrate react-binden with other libraries

### as (Custom Component)

React Binden comopnents can be used as HOC (Higher Order Component) too. That means you can at the same time initialize it, provide parent/base component & pass props. In React Binden, the `as` prop is used to provide any custom replacement component for `Input`, `Textarea`, `Select` & `Form`

Using custom component example

```jsx live
function Login() {
    // Custom component that applies the theme of the
    // site/app to the field
    const CustomInput = forwardRef(function CustomInput(props, ref) {
        return (
            <input
                ref={ref}
                {...props}
                style={{
                    ...props.style,
                    border: 'orange 1px solid',
                    background: 'skyblue',
                }}
            />
        );
    });

    const model = useModel('');

    // Open the Browser Console to see the Output
    console.log(
        '[/docs/tutorials/3rd-party-ui-libraries#as-custom-component] Output:',
        model,
    );

    return (
        <Form
            onSubmit={() => {
                /*...*/
            }}
        >
            <Input model={model} as={CustomInput} placeholder="Awesome Input" />
            <button type="submit">Submit</button>
        </Form>
    );
}
```

### map-props

If you need more flexibility than there's React Binden's flagship component prop `map-props`. Which gives you the super power to change any prop & it's key/value. It provides all the props provided to the specific component & expects an object to be returned. Btw, `map-props` is really dangerous to use as one might mess up things by providing the wrong. Thus use it with isolation. Meaning, create a shared component first where you use `map-props` & than using the newly created component throughout the project

:::info
`map-props` doesn't get merged with previously passed props so the user have to do it using the JS spread operator when using. And `model` object isn't provided in `map-props`'s argument. You can use the model hook's values directly
:::

Even though, it can cause potential issues but it's quite a lot safe too only if the user is alert. And it can be extremely useful when connecting React Binden components with other 3rd party library

Example with chakra-ui's `Input` component

```jsx
import React, { forwardRef } from 'react';
import { Input as ChakraInput, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { Input } from 'react-binden';

export const ChakraField = forwardRef(function TextField(
    {
        colorScheme,
        isDisabled,
        isInvalid,
        isReadOnly,
        isRequired,
        label,
        size,
        variant,
        ...props
    },
    ref,
) {
    return (
        <FormControl
            colorScheme={colorScheme}
            isDisabled={isDisabled}
            isInvalid={isInvalid}
            isReadOnly={isReadOnly}
            isRequired={isRequired}
            label={label}
            size={size}
            variant={variant}
        >
            <ChakraInput ref={ref} {..props}/>
            <FormHelperText>{isInvalid}</FormHelperText>
        </FormControl>
    );
});

export const CustomInput = forwardRef(function CustomInput(props, ref) {
    return (
            <Input
                as={ChakraField}
                {...props}
                ref={ref}
                map-props={({ ...mappable }) => ({
                    ...mappable,
                    isReadOnly: mappable.readonly,
                    isRequired: mappable.required,
                    isDisabled: mappable.disabled,
                    // setting the actual props undefined to prevent
                    // passing excessive props
                    required: undefined,
                    disabled: undefined,
                })}
            />
    );
});
```
