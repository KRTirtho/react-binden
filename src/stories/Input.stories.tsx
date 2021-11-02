import React from 'react';
import { Meta } from '@storybook/react';
import { Input, InputProps } from '../components/Input';
import { useModel } from '../hooks/useModel';
import { Form, regex } from '../main';

export default {
  title: 'Components/Input',
  component: Input,
} as Meta<InputProps>;

const Template = (props: InputProps) => {
  const model = useModel('');
  const model2 = useModel("What a field!")

  return (
    <Form>
      <Input {...props} model={model} />
      <p>defaultValue: {model.defaultValue}</p>
      <p>value: {model.value}</p>
      <p>error: {model.error}</p>
      <p>touched: {String(model.touched)}</p>

      <h3>Default Value</h3>

      <Input {...props} model={model2} />
      <p>defaultValue: {model2.defaultValue}</p>
      <p>value: {model2.value}</p>
      <p>error: {model2.error}</p>
      <p>touched: {String(model2.touched)}</p>
      <button type="submit">Submit</button>
    </Form>
  );
};

export const WithDefault = Template.bind({});

(WithDefault as any).args = {
  required: false,
  type: 'text',
  maxLength: 50,
  minLength: 10,
  "semantic-validation": false,
  pattern: [regex.email, "need an email"]
} as InputProps;
