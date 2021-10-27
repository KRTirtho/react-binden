<img width="100%" height="auto" src="/website/static/img/react-binden-banner.svg" alt="React Binden Logo"/>

A React form handling library with semantic validation

Its a minimal & lightweight form library that provides simple components, hooks to handle `input`s & `textarea`s. Supports **field-imprinting** (a system where a field follows another field's value for match. e.g Confirm Password & Password field) & handles form submission/reset

## Installation

npm/yarn installation:

```bash
$ npm i --save react-binden
```

```bash
$ yarn add react-binden
```

## Introduction

react-binden uses both components & hooks based approach to make the form handling as easy as possible. It doesn't require any schema validation library like zod, ypu, joi, etc. react-binden uses built-in semantic HTML validation (which can be turned off) & provides a way to provide custom error messages. Validation is handled completely manually instead of 3rd party library, reducing the build size. By default it provides:

-   min/max for number based inputs
-   minLength/maxLength for text based inputs
-   multiple pattern matching
-   required/optional field
-   model imprinting

react-binden uses custom component with it's own hooks. It makes it look more like vue-js's form-handling approach & actually this is what this library is inspired from. Also provides way to **lift-up-state** with `useForm` hook incase the state of Form is required.

Provided Components:

-   Form
-   Input
-   Textarea
-   Field

Provided Hooks:

-   useModel
-   useForm

react-binden can be integrated with other 3rd-party UI-component-framework. The `as` prop of both `Input` & `Textarea` allows to pass custom component constructors. Also provides way to map props to that custom component with the `map-props` prop

## Hooks & Components

### useModel

It's basic modeling hook that binds the value/handler with input & provides the state of the input.
This hooks is nothing but a state initializer. It just initializes the `{value, error, touched}` states. It accepts a default value too

Example of `useModel`:

```js
const model = useModel('default value can be a string, number or a boolean');
// it has following properties & methods
model.defaultValue;
model.value;
model.setValue;
model.error;
model.setError;
model.touched;
model.setTouched;
```

### useForm

Just like `useModel` but initializes states for form or up-lifts the state of the form for accessing in parent component. Holds the state of errors, reset, submit & touched of the Form

Example of `useForm`:

```jsx
const states = useForm();
// it has follwing
states.errors;
states.reset;
states.setErrors;
states.setReset;
states.setSubmitting;
states.submitting;
```

### Input & Textarea

`Input` & `Textarea` are the most basic components of this library. Both of them inherit from the `Field` component. `Field` is the lower level component which handle validation & other logic (Don't use `Field` in place of `Input`/`Textarea`)

Both `Input` & `Textarea` are identical. Has same props except without `min` & `max` in `Textarea` as its a text field

Props of `Input` & `Textarea`:
| Name | type | description | Input | Textarea |
|-------|-------|-------------|-------|----------|
| as | `ElementLike \| undefined` | Used for passing custom component/element. `Input` only accepts components based of `input` & `Textarea` accepts `textarea` based components | [x] | [x] |
| model | `FieldModel<any>` | For binding field's value with the variable | [x] | [x] |
| imprint-model | `FieldModel<any> \| undefined` | For imprinting/following other field's value. If it's used then validation won't work | [x] | [x] |
| maxLength | `number \| [number, string] \| undefined` | Maximum allowed character length of the input. Custom message can be passed incase of errors | [x] | [x] |
| minLength | `number \| [number, string] \| undefined` | Minimum allowed character length of the input. Custom message can be passed incase of errors | [x] | [x] |
| max | `number \| [number, string] \| undefined` | Maximum allowed number of the input value. Custom message can be passed incase of errors | [x] | [ ] |
| min | `number \| [number, string] \| undefined` | Minimum allowed number of the input value. Custom message can be passed incase of errors | [x] | [ ] |
| map-props | `function \| undefined` | Prop mapping function. Gives all the props as argument. Should return a valid merged/custom props object | [x] | [x] |
| pattern | `RegExp \| [RegExp \| RegExp[], string] \| undefined` | Patterns for matching with input value. It's a lazy matching. The field will get validated if one of these pattern matches with the value. Custom error message is also supported | [x] | [x] |
| required | `boolean \| string \| undefined` | Makes the field required/optional | [x] | [x] |
| validate | `function \| undefined` | Custom validation function. Should return either `true` or `false` | [x] | [x] |
| semantic-validation | `boolean \| undefined` | Enables/disables semantic/default HTML based validation | [x] | [x] |

Both of them also accept other `input` & `textarea` related props

Example of Input:

```jsx
  const model = useModel('');
  const {defaultValue, value, setValue, error, setError, touched, setTouched} = model
    <Input
        mode={model}
        type="text"
        as={CustomInput}
        minLength={[10, "Minimum 10 characters"]}
        minLength={[30, "Maximum 30 characters"]}
        pattern={[/\w/g, "Only alphabets are allowed"]}
        required="This field is required"
        validate={(value, touched)=>{
            if(value.includes("BS"))return false
            return true
        }}
        map-props={(props)=>{
            // suppose the `CustomInput` component accepts error message separately
            if(props.error)return {...props, error-label: error}
            return props
        }}
        semantic-validation // it's by default `true`. Showing for demonstration
    />
```

### Form

`Form` is the main wrapper. It handles submit & resets. Also keeps track of global errors, form touched, submitting & resetting state
It's just basic a `form` wrapped with some simple logic & can accept custom `form` component via `as` prop
It also supports **state-lifting** via the `states` prop using the `useForm` hook
The `onSubmit` callback provides the _event-object_, `{errors, rest}` state & `{setErrors, setSubmitting, resetForm}` methods

Form example:

```jsx
const states = useForm();
const { errors, reset, setErrors, setReset, setSubmitting, submitting } = states;
<Form
    as={CustomForm}
    onSubmit={(e, { errors, reset }, { setErrors, setSubmitting, resetForm }) => {
        // submit logic
    }}
    states={states} // not required but can be used if the parent component needs the state
/>;
```

## Usage

Basic Signup Form handling example:

```jsx
import React from 'react';
import { Input, useModel, Form, FormProps, regex } from 'react-binden';

const url = 'http://your-site.com/signup';

function Signup() {
    // `model`s are similar to vue-js's v-bind:model
    const email = useModel('');
    const password = useModel('');
    const confirmPassword = useModel('');

    // handler for `onSubmit` event
    const handleSubmit: FormProps['onSubmit'] = async (e, values, { resetForm }) => {
        // submitting/POSTing to backend
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ email, password, confirmPassword }),
        });
        if (res.ok) resetForm();
        else alert('Failed to submit form');
    };

    const formStyles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    return (
        <div>
            <Form style={formStyles} onSubmit={handleSubmit}>
                <Input
                    type="email"
                    model={email} // binds the value & handler
                    pattern={[regex.email, 'Type in a valid email']} // value pattern matching with custom error message
                    placeholder="Email"
                    required // makes the field required | Form won't be submittable until this gets perfectly validated
                />
                <Input
                    model={password}
                    type="password"
                    minLength={8} // minimum length of character allowed in a field
                    maxLength={16} // maximum length of character allowed in a field
                    required
                    placeholder="Password"
                />
                <Input
                    type="password"
                    imprint-model={password} // checks for the match with the other field's value with its own
                    model={confirmPassword}
                    required
                    placeholder="Confirm Password"
                />
                <button type="submit">Submit</button>
            </Form>
        </div>
    );
}

export default Signup;
```

> Currently, only `Input` & `Textarea` are supported. But `Select`, `Option` & `type=radio` support will be added soon

## Running Locally

To run it locally, git clone the repo

```bash
$ git clone https://github.com/KRTirtho/react-binden.git
$ cd react-binden
```

Then run:

```bash
$ npm install
$ npm run storybook
```

It'll start the storybook server for development/component viewing

## Contribution

Any kind of improving contribution following [CONTRIBUTION.md](#null) is welcomed
