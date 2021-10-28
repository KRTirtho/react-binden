---
id: form
title: Form
sidebar_position: 1
---

React Binden's basic `form` wrapper component. It acts as like both Form & context Provider. It's required to wrap all the Input fields with this component

### Usage

It has the same props like a vanilla `form` just with some extra props. But React Binden under the hood also creates context for the Field, Input, Select & Textarea to work. It has the option to use user provided custom component instead of the base html `form`. The `as` prop allows doing so

Example of Form

```jsx
<Form
    onSubmit={() => {
        // handling form submission
    }}
>
    {/*... other components*/}
</Form>
```

### Using with `useForm`

If there's any need for the form's internal state outside of the `Form` component than the `states` prop of the `Form` can be used to do so. This is where `useForm` comes to play which provides basic state & state setters for the Form

```jsx
const formState = useForm();

useEffect(() => {
    formState.errors;
    formState.reset;
    formState.submitting;

    formState.setErrors(false);
    formState.setReset(false);
    formState.setSubmitting(false);
}, []);

return (
    <Form
        states={formState}
        onSubmit={() => {
            /*handling form submission*/
        }}
    >
        {/*... other components*/}
    </Form>
);
```

### API

| Name     | type                                              | default     |
| -------- | ------------------------------------------------- | ----------- |
| as       | `React.ElementType`                               | `undefined` |
| onSubmit | `(event, states, methods)=>Promise<void> \| void` | `undefined` |
| states   | `Object`                                          | `undefined` |
