import React from 'react';
import { Meta } from '@storybook/react';
import { Input, InputProps } from '../components/Input';
import { useModel } from '../hooks/useModel';

export default {
  title: 'Examples/RadioGroup',
  component: Input,
} as Meta<InputProps>;

const Template = (props: InputProps) => {
  const model = useModel('');

  return (
    <div>
      <Input type="radio" {...props} model={model} value="Why?"/>
      <Input type="radio" {...props} model={model} value="How?" />
      <p>defaultValue: {model.defaultValue}</p>
      <p>value: {model.value.toString()}</p>
      <p>error: {model.error}</p>
      <p>touched: {String(model.touched)}</p>
    </div>
  );
};

export const Default = Template.bind({});
