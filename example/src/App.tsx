import React, {
  ComponentPropsWithoutRef,
  CSSProperties,
  forwardRef,
  useMemo,
} from 'react';
import { Form, FormProps, useModel, Input } from "react-bind"
import ReactDOM from 'react-dom';

interface CustomInputProps extends ComponentPropsWithoutRef<'input'> {
  error?: string | boolean;
  label?: string;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(function CustomInput(
  { error, label, ...props },
  ref,
) {
  const styles = useMemo<CSSProperties>(() => {
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

  const hintStyle: CSSProperties = {
    color: 'red',
    fontSize: '0.8rem',
  };

  const id = (Date.now() * Math.random()).toString();

  return (
    <div style={wrapperStyle}>
      <div>
        <label htmlFor={props.id ?? id}>{label}</label>
        <input id={id} {...props} style={styles} ref={ref} />
      </div>
      <span aria-roledescription="hint" style={hintStyle}>
        {typeof error === 'boolean' ? 'An error occurred' : error}
      </span>
    </div>
  );
});
let counter = 0;

const emailReg =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
function App() {
  const email = useModel('', {
    pattern: [emailReg, 'Type in a valid email'],
    required: true,
  });
  const password = useModel('');
  const confirmPassword = useModel('');

  console.log(`INPUTS ${counter}`, {
    email,
    password,
    confirmPassword,
  });
  counter++;

  // const phoneReg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  const handleSubmit: FormProps['onSubmit'] = (e, values, handlers) => {
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
          as={CustomInput}
          model={email}
          placeholder="Email"
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
          imprint-model={password}
          model={confirmPassword}
          required
          placeholder="Confirm Password"
        />
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
