---
id: submission
title: Submission
sidebar_position: 2
---

React Binden automates the Form Submission procedure very simply. One can use a simple `button` with `type="submit"` to submit the form. React Binden will use `event.preventDefault()` under the hood so that no page refresh occurs. One can then use `Form` component's `onSubmit` callback to other works inside of it

### onSubmit callback arguments

`onSubmit` provides the actual `event` param, global `reset (boolean)`, `errors (boolean)` state & some functions required for handling/submitting the form. Those are:

-   resetForm
-   setSubmitting
-   setErrors - allows modifying the global `errors` state. Can be used to force form submission even when there are errors in certain fields

### Async submission

`onSubmit` also supports `async` form submission. So asynchronous functions can be used inside of it

### Example of form submission

Simple Login form submission handling example

```jsx
import React from 'react';
import { Form, Input, useModel, regex } from 'react-binden';

export function Login() {
    const email = useModel();
    const password = useModel();

    return (
        <Form
            onSubmit={async (
                e,
                { errors, reset },
                { resetForm, setSubmitting, setErrors },
            ) => {
                try {
                    // browser fetch request
                    const headers = new Headers();
                    headers.set('Content-type', 'application/json');

                    const body = JSON.stringify({
                        email: email.value,
                        password: password.value,
                    });
                    const req = await fetch('/login', {
                        method: 'POST',
                        headers,
                        body,
                    });
                    const res = await req.json();
                    if (res.ok) resetForm();
                    else if (res.status === 401) alert('Wrong Email/Password');
                } catch (e) {
                    alert(`ERROR ${e}`);
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            <Input
                model={email}
                pattern={regex.email}
                placeholder="Write your email"
                required
            />
            <Input
                model={password}
                pattern={regex.moderatePassword}
                placeholder="Password"
                required
            />
            <button type="submit">Login</button>
        </Form>
    );
}
```
