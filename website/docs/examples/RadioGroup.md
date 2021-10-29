---
id: radio-group
title: Radio Group
sidebar_position: 3
---

### Usage

React Binden has straight forward support for radio-group. Just use the prop `type="radio"` in `Input`. Provide a name for the radio-group in `useModel`'s option object (2nd param). It can be also done by giving the same `name` prop on multiple `type="radio"` but it requires more manual labor. Thus option-1 is much time saving. Finally use the same `model` for every radio-button in the radio-group & provide different & unique values for each radio-button

```jsx live
function Example() {
    const model = useModel('', { name: 'Hola', required: true });

    // Open your browser console to see the Output
    console.log('[/docs/examples/radio-group#usage Output:', model);

    return (
        <Form>
            <label>
                <Input type="radio" model={model} value="Why?" />
                Why?
            </label>
            <label>
                <Input type="radio" model={model} value="How?" />
                How?
            </label>
            <button type="submit">Submit</button>
        </Form>
    );
}
```

:::info
Except `required` prop, any other [validation prop](/docs/tutorials/validation) of `Input` doesn't work for `type="radio"`
:::

To select any radio-button by default write the exact same `value` of that radio-button instead of the empty string in `useModel`'s `defaultValue` parameter (1st param)

:::tip
Write "Why?" inside empty String of the radio-group example's `useModel` hook & then see the result

Radio Button with the "Why?" value should be checked by default
:::
