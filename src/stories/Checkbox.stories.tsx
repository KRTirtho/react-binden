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
  const model2 = useModel(["Lady", "Black Sheep"]);


  return (
    <div>
      <label>
        <Input type="checkbox" model={model} value="Lady" />
        Lady
      </label>
      <label>
        <Input type="checkbox" model={model} value="Gentlemen" />
        Gentlemen
      </label>
      <label>
        <Input type="checkbox" model={model} value="Black Sheep" />
        Black Sheep
      </label>
      <label>
        <Input type="checkbox" model={model} value="Master's Kid" />
        Master&apos;s Kid
      </label>
      <p>defaultValue: {model.defaultValue.toString()}</p>
      <p>value: {model.value.toString()}</p>
      <p>error: {model.error.toString()}</p>
      <p>touched: {String(model.touched)}</p>

      <h3>With Default Values</h3>

      <label>
        <Input type="checkbox" model={model2} value="Lady" />
        Lady
      </label>
      <label>
        <Input type="checkbox" model={model2} value="Gentlemen" />
        Gentlemen
      </label>
      <label>
        <Input type="checkbox" model={model2} value="Black Sheep" />
        Black Sheep
      </label>
      <label>
        <Input type="checkbox" model={model2} value="Master's Kid" />
        Master&apos;s Kid
      </label>
      <p>defaultValue: {model2.defaultValue.toString()}</p>
      <p>value: {model2.value.toString()}</p>
      <p>error: {model2.error.toString()}</p>
      <p>touched: {String(model2.touched)}</p>
    </div>
  );
};

export const Default = Template.bind({});
