import React from 'react';
import { Meta } from '@storybook/react';
import { Input, InputProps } from '../components/Input';
import { useModel } from '../hooks/useModel';

export default {
  title: 'Examples/Checkbox',
  component: Input,
} as Meta<InputProps>;

const Template = () => {
  const model = useModel([]);

  return (
    <div>
      <Input type="checkbox" model={model} value="Lady" />
      <Input type="checkbox" model={model} value="Gentlemen" />
      <Input type="checkbox" model={model} value="Black Sheep" />
      <Input type="checkbox" model={model} value="Master's Kid" />
      <p>defaultValue: {model.defaultValue}</p>
      <p>value: {model.value.toString()}</p>
      <p>error: {model.error}</p>
      <p>touched: {String(model.touched)}</p>
    </div>
  );
};

export const Default = Template.bind({});
