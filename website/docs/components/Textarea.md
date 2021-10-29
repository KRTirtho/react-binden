---
id: textarea
title: Textarea
sidebar_position: 3
---

`Textarea` is just like `Input` and has almost the same props API except the `min`, `max` & `pattern` props

### Usage

```jsx live
function Example() {
    const model = useModel('');
    // Open the Browser Console to see the values
    console.info('[/docs/components/textarea#usage] Output:', model);
    return (
        <Form
            onSubmit={() => {
                /*.....*/
                return;
            }}
        >
            <Textarea
                model={model}
                placeholder="Description"
                minLength={20}
                maxLength={[300, 'What, wanna write an essay?']}
                required="Hey, where are you going?"
            />
            <button type="submit">Submit</button>
        </Form>
    );
}
```

### API

| Name                                                          | type                                          | description                                                                                              |
| ------------------------------------------------------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| as                                                            | `ElementLike` \| `undefined`                  | Used for passing custom component/element. Only accepts components based of `textarea`                   |
| model                                                         | `FieldModel<any>`                             | Binds the field with declared `useModel` model                                                           |
| imprint-model                                                 | `FieldModel<any>` \| `undefined`              | Imprints/duckling follows another field's value only. This disables all validations of current field     |
| maxLength                                                     | `number` \| `[number, string]` \| `undefined` | Maximum allowed character length of the textarea. Custom message can be passed incase of errors          |
| minLength                                                     | `number` \| `[number, string]` \| `undefined` | Minimum allowed character length of the textarea. Custom message can be passed incase of errors          |
| [map-props](/docs/tutorials/3rd-party-ui-libraries#map-props) | `function` \| `undefined`                     | Prop mapping function. Gives all the props as argument. Should return a valid merged/custom props object |
| required                                                      | `boolean` \| `string` \| `undefined`          | Makes the field required/optional                                                                        |
| validate                                                      | `function` \| `undefined`                     | Custom validation function. Should return either `true` or `false`                                       |
| semantic-validation                                           | `boolean` \| `undefined`                      | Enables/disables semantic/default HTML based validation                                                  |
