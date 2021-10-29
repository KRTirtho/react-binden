---
id: field-imprinting
title: Field Imprinting
sidebar_position: 4
---

Model Imprinting means a field with certain model follows another field's model. It doesn't do validations by itself instead relies on the model it's following. The only thing it validates is that its value matches the value of the followee field

This can be really useful for scenarios such as signup forms with password & confirm password

The `imprint-model` prop allows to do so

Here's an example of a Signup form

```jsx
const username = useModel('');
const password = useModel('');
const confirmPassword = useModel('');

return (
    <Form>
        <Input
            model={username}
            required
            pattern={regex.email}
            placeholder="Write your Email"
        />
        <Input
            model={password}
            required
            pattern={regex.moderatePassword}
            placeholder="Password"
        />
        <Input
            model={confirmPassword}
            imprint-model={password}
            required
            placeholder="Confirm Password"
        />

        <button type="submit">Sign Up</button>
    </Form>
);
```
