import React from 'react';
import { Meta } from '@storybook/react';
import { Input, InputProps } from '../components/Input';
import { useModel } from '../hooks/useModel';

export default {
  title: 'Examples/RadioGroup',
  component: Input,
} as Meta<InputProps>;

const Template = () => {
  const model = useModel('', { name: "Hola" });

  return (
    <div>
      <Input type="radio" model={model} value="Why?" />
      <Input type="radio" model={model} value="How?" />
      <p>defaultValue: {String(model.defaultValue)}</p>
      <p>value: {model.value.toString()}</p>
      <p>error: {String(model.error)}</p>
      <p>touched: {String(model.touched)}</p>
    </div>
  );
};

export const Default = Template.bind({});
