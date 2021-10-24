import React from 'react';
import { Meta } from '@storybook/react';
import { useModel } from '../hooks/useModel';
import { Select, SelectProps } from '../components/Select';
import { Form } from '../main';

export default {
  title: 'Components/Select',
  component: Select,
} as Meta<SelectProps>;

const Template = (props: SelectProps) => {
  const model = useModel('');
  const model2 = useModel("Squid")

  return (
    <Form>
      <Select {...props} model={model}>
        <option disabled value=""> -- select an option -- </option>
        <option value="Gorgeous">Gorgeous</option>
        <option value="Beautiful">Beautiful</option>
        <option value="Squid">Squid</option>
      </Select>
      <p>defaultValue: {model.defaultValue}</p>
      <p>value: {model.value}</p>
      <p>error: {model.error}</p>
      <p>touched: {String(model.touched)}</p>

      <h3>Default Value</h3>

      <Select {...props} model={model2}>
        <option disabled value=""> -- select an option -- </option>
        <option value="Gorgeous">Gorgeous</option>
        <option value="Beautiful">Beautiful</option>
        <option value="Squid">Squid</option>
      </Select>
      <p>defaultValue: {model2.defaultValue}</p>
      <p>value: {model2.value}</p>
      <p>error: {model2.error}</p>
      <p>touched: {String(model2.touched)}</p>

      <button type="submit">Submit</button>
    </Form>
  );
};

export const Default = Template.bind({});

(Default as any).args = {
  required: false,
} as SelectProps;
