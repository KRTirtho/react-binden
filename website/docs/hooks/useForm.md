---
id: use-form
title: useForm
sidebar_position: 2
---

It's a hook similar to [`useModel`](/docs/Hooks/use-model) but it **up-lifts** the state of a [`Form`](/docs/Components/form). That means it enables one to use & modify a `Form`'s contextual state outside that `Form`. It just a hook that calls bunch of `useState` hooks & returns them required for the `Form`

Up-lifting a form's state:

```jsx
const formState = useForm();

return <Form states={formState}>{/*other components*/}</Form>;
```

Now it will give access to the `Form`'s internal state. And those are:

-   `errors` (boolean) & `setErrors`
-   `reset` (boolean) & `setReset`
-   `submitting` (boolean) & `setSubmitting`


:::info
Learn about `Form` [here](/docs/Components/form)
:::