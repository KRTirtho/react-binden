---
id: field
title: Field
sidebar_position: 5
---

`Field` is the base of `Input` & `Textarea`. It is the parent component that does all validation & input handling on behalf of those inherited components. It supports the props of both `Input` & `Textarea`

There is no need to use it in a real-world application since `Input` & `Textarea` provides all necessary user-friendly abstraction

### API

| Name                                                          | type                                                  | description                                                                                                                                                                       |
| ------------------------------------------------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| as                                                            | `ElementLike \| undefined`                            | Used for passing custom component/element                                                                                                                                         |
| model                                                         | `FieldModel<any>`                                     | Binds the field with declared `useModel` model                                                                                                                                    |
| [imprint-model](/docs/examples/field-imprinting)                                                 | `FieldModel<any> \| undefined`                        | Imprints/duckling follows another field's value only. This disables all validations of current field                                                                              |
| maxLength                                                     | `number \| [number, string] \| undefined`             | Maximum allowed character length of the input. Custom message can be passed incase of errors                                                                                      |
| minLength                                                     | `number \| [number, string] \| undefined`             | Minimum allowed character length of the input. Custom message can be passed incase of errors                                                                                      |
| max                                                           | `number \| [number, string] \| undefined`             | Maximum allowed number of the input value. Custom message can be passed incase of errors                                                                                          |
| min                                                           | `number \| [number, string] \| undefined`             | Minimum allowed number of the input value. Custom message can be passed incase of errors                                                                                          |
| [map-props](/docs/tutorials/3rd-party-ui-libraries#map-props) | `function \| undefined`                               | Prop mapping function. Gives all the props as argument. Should return a valid merged/custom props object                                                                          |
| pattern                                                       | `RegExp \| [RegExp \| RegExp[], string] \| undefined` | Patterns for matching with input value. It's a lazy matching. The field will get validated if one of these pattern matches with the value. Custom error message is also supported |
| required                                                      | `boolean \| string \| undefined`                      | Makes the field required/optional                                                                                                                                                 |
| validate                                                      | `function \| undefined`                               | Custom validation function. Should return either `true` or `false`                                                                                                                |
| semantic-validation                                           | `boolean \| undefined`                                | Enables/disables semantic/default HTML based validation                                                                                                                           |
