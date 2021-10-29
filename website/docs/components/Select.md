---
id: select
title: Select
sidebar_position: 4
---

`Select` is the React Binden counterpart of HTML `select` element. It works & acts the same way basic `select` does. `Select` makes it really easy to manipulate the value of it. It currently doesn't have any special type of validation except required. But one can do manual validation using the `validate` method

It support custom components through `as` & custom mapping of props using `map-props`

### Usage

Just like any basic `select` it requires `option`(s) as it children

```jsx live
function Example() {
    const model = useModel('');

    // open browser console so see the Output
    console.info(`[/docs/components/select#usage] Output:`, model);

    return (
        <Form>
            <Select model={model} required="What do you think?">
                <option disabled value="">
                    -- select an option
                </option>
                <option value="Gorgeous">Gorgeous</option>
                <option value="Beautiful">Beautiful</option>
                <option value="Squid">Squid</option>
            </Select>
            <button>Submit</button>
        </Form>
    );
}
```

:::info
You can provide `useModel` a `defaultValue` matching to one of the options of `Select` to choose it by default
:::

### API

| Name                                                          | type                                 | description                                                                                              |
| ------------------------------------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| as                                                            | `ElementLike` \| `undefined`         | Used for passing custom component/element. Only accepts components based of `select`                     |
| model                                                         | `FieldModel<any>`                    | Binds the field with declared `useModel` model                                                           |
| [map-props](/docs/tutorials/3rd-party-ui-libraries#map-props) | `function` \| `undefined`            | Prop mapping function. Gives all the props as argument. Should return a valid merged/custom props object |
| required                                                      | `boolean` \| `string` \| `undefined` | Makes the field required/optional                                                                        |
| validate                                                      | `function` \| `undefined`            | Custom validation function. Should return either `true` or `false`                                       |
| semantic-validation                                           | `boolean` \| `undefined`             | Enables/disables semantic/default HTML based validation                                                  |
