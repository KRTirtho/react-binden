import React from 'react';
import { Meta } from '@storybook/react';
import { Input, InputProps } from '../components/Input';
import { useModel } from '../hooks/useModel';
import { Form } from '../main';

export default {
  title: 'Examples/RadioGroup',
  component: Input,
} as Meta<InputProps>;

const Template = () => {
  const model = useModel("", { name: "Hola" });

  const model2 = useModel("Agree", { name: "prompt" })

  return (
    <Form>
      <label>
        <Input type="radio" model={model} value="Why?" />
        Why?
      </label>
      <label >
        <Input type="radio" model={model} value="How?" />
        How?
      </label>
      <p>defaultValue: {String(model.defaultValue)}</p>
      <p>value: {model.value.toString()}</p>
      <p>error: {String(model.error)}</p>
      <p>touched: {String(model.touched)}</p>

      <h3>With Default Value</h3>

      <label>
        <Input type="radio" model={model2} value="Agree" />
        Agree
      </label>
      <label>
        <Input type="radio" model={model2} value="Disagree" />
        Disagree
      </label>
      <p>defaultValue: {String(model2.defaultValue)}</p>
      <p>value: {model2.value.toString()}</p>
      <p>error: {String(model2.error)}</p>
      <p>touched: {String(model2.touched)}</p>

      <button type="submit">Submit</button>

    </Form>
  );
};

export const Default = Template.bind({});