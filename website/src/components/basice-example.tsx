import React, { CSSProperties, forwardRef, useMemo } from 'react';
import { Form, useModel, Input } from "react-binden"

function Login() {
  // a simple component just for provide basic style to the inputs
  const CustomInput = forwardRef<HTMLInputElement, any>(function CustomInput({ error, label, ...props }, ref) {
    const styles: CSSProperties = useMemo(() => {
      return {
        padding: '10px',
        border: error ? 'red solid 1px' : 'skyblue solid 1px',
        borderRadius: '5px',
      };
    }, [error]);

    const wrapperStyle: CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'center',
    };

    const hintStyle = {
      color: 'red',
      fontSize: '0.8rem',
    };

    const id = (Date.now() * Math.random()).toString();

    return (
      <div style={wrapperStyle}>
        <div>
          <label htmlFor={props.id ? props.id : id}>{label}</label>
          <input id={id} {...props} style={styles} ref={ref} />
        </div>
        <span aria-roledescription="hint" style={hintStyle}>
          {/*In case no custom error message was provided*/}
          {typeof error === 'boolean' ? 'An error occurred' : error}
        </span>
      </div>
    );
  });

  const regex = {
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  }

  const email = useModel('', {
    pattern: [regex.email, 'Type in a valid email'],
    required: true,
  });
  const password = useModel('');
  const confirmPassword = useModel('');

  const handleSubmit = (e, values, handlers) => {
    console.log('VALUES', values);
    console.log('HANDLERS', handlers);
    handlers.resetForm();
  };

  return (
    <div>
      <Form
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        onSubmit={handleSubmit}
      >
        <Input
          // Input is a HOC too thus you can provide your own
          // modified custom input component
          type="email"
          as={CustomInput}
          model={email}
          placeholder="Email"
          required
        />
        <Input
          as={CustomInput}
          model={password}
          type="password"
          minLength={8}
          maxLength={16}
          required
          placeholder="Password"
        />
        <Input
          as={CustomInput}
          type="password"
          model={confirmPassword}
          // this will make this field to follow
          // the validation of model `password`
          imprint-model={password}
          required
          placeholder="Confirm Password"
        />
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}

export default Login;