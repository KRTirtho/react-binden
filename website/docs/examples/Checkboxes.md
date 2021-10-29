---
id: checkboxes
title: Checkboxes
sidebar_position: 2
---

React Binden supports checkbox & checkbox-group. Just use the prop `type="checkbox"` in `Input`. Then use it like any other Input/Select/Textarea component

### Using checkbox

```jsx live
function CheckboxExample() {
    const model = useModel(false);

    // Open your browser console to see the Output
    console.log('[/docs/examples/checkboxes#using-checkbox] Output:', model);

    return (
        <Form>
            <Input model={model} type="checkbox" />
            <button type="submit">Submit</button>
        </Form>
    );
}
```

:::info
Only the `required` validation prop works for checkboxes
:::

### Checkbox Group

Checkbox group are really easy to create in React Binden. Just provide an **empty Array** `[]` as default value in `useModel`. Then provide the same model to multiple checkboxes. But use a different & unique `value` for each checkboxes. The value of the checked checkboxes will get pushed into the model's array & will get filtered out when that checkbox get unchecked

Here's an example

```jsx live
function Example() {
    const model = useModel([]);

    // Open your browser console to see the Output
    console.log('[/docs/examples/checkboxes#checkbox-group Output:', model);

    return (
        <Form>
            <label>
                <Input type="checkbox" model={model} value="Lady" />
                Lady
            </label>
            <label>
                <Input type="checkbox" model={model} value="Gentlemen" />
                Gentlemen
            </label>
            <label>
                <Input type="checkbox" model={model} value="Black Sheep" />
                Black Sheep
            </label>
        </Form>
    );
}
```

To make any checkbox checked by default write the exact same value of that checkbox in the empty Array `[]` of `useModel`

:::tip
Write "Lady", "Gentlemen" inside empty Array of the checkbox-group example's `useModel` hook & then see the result

Checkboxes with the following "Lady" & "Gentlemen" values should be checked by default
:::
