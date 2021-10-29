---
id: input
title: Input
sidebar_position: 2
---

Input is the component that act as the HTML `input` field. It inherits from [`Field`](/docs/components/field) & has identical props to a basic `input`

It should be wrapped with a `Form` component as it need access to the `FormContext`

### Usage

Basic usage of Input

```jsx live
function Example() {
    const model = useModel('');
    // Open the Browser Console to see the values
    console.info('[/docs/components/input#usage] Output:', model);
    return (
        <Form
            onSubmit={() => {
                /*.....*/
            }}
        >
            <Input
                model={model}
                placeholder="Type here..."
                minLength={5}
                maxLength={[12, 'No 13']}
                required="Hey, where are you going?"
            />
            <button type="submit">Submit</button>
        </Form>
    );
}
```

### Validation props

Input does all validation & handles the value of the input field. The validation props follows the [HTML Form standards](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Form_validation)

It supports following validation props:

-   `min`
-   `max`
-   `minLength`
-   `maxLength`
-   `pattern`
-   `required`

> You can learn more about validation in [/docs/tutorials/validation](/docs/tutorials/validation)

### Custom Component

`Input` has the `as` prop to provide a custom base `input` component. Which also allows for connecting react-binden with other 3rd-party library really easily (without even a 3rd party library)

> You can learn about `as` at [/docs/tutorials/3rd-party-ui-libraries#as-custom-component](/docs/tutorials/3rd-party-ui-libraries#as-custom-component)

### API

| Name                                                          | type                                                  | description                                                                                                                                                                       |
| ------------------------------------------------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| as                                                            | `ElementLike \| undefined`                            | Used for passing custom component/element. Only accepts components based of `input`                                                                                               |
| model                                                         | `FieldModel<any>`                                     | Binds the field with declared `useModel` model                                                                                                                                    |
| [imprint-model](/docs/examples/field-imprinting)              | `FieldModel<any> \| undefined`                        | Imprints/duckling follows another field's value only. This disables all validations of current field                                                                              |
| maxLength                                                     | `number \| [number, string] \| undefined`             | Maximum allowed character length of the input. Custom message can be passed incase of errors                                                                                      |
| minLength                                                     | `number \| [number, string] \| undefined`             | Minimum allowed character length of the input. Custom message can be passed incase of errors                                                                                      |
| max                                                           | `number \| [number, string] \| undefined`             | Maximum allowed number of the input value. Custom message can be passed incase of errors                                                                                          |
| min                                                           | `number \| [number, string] \| undefined`             | Minimum allowed number of the input value. Custom message can be passed incase of errors                                                                                          |
| [map-props](/docs/tutorials/3rd-party-ui-libraries#map-props) | `function \| undefined`                               | Prop mapping function. Gives all the props as argument. Should return a valid merged/custom props object                                                                          |
| pattern                                                       | `RegExp \| [RegExp \| RegExp[], string] \| undefined` | Patterns for matching with input value. It's a lazy matching. The field will get validated if one of these pattern matches with the value. Custom error message is also supported |
| required                                                      | `boolean \| string \| undefined`                      | Makes the field required/optional                                                                                                                                                 |
| validate                                                      | `function \| undefined`                               | Custom validation function. Should return either `true` or `false`                                                                                                                |
| semantic-validation                                           | `boolean \| undefined`                                | Enables/disables semantic/default HTML based validation                                                                                                                           |
