import React from 'react';
import { Meta } from '@storybook/react';
import Input, { InputProps } from '../components/Input';
import { useModel } from '../hooks/useModel';

export default {
    title: 'Components/Input',
    component: Input,
} as Meta<InputProps>;

const Template = (props: InputProps) => {
    const model = useModel('');

    return (
        <div>
            <Input {...props} model={model} />
            <p>defaultValue: {model.defaultValue}</p>
            <p>value: {model.value}</p>
            <p>error: {model.error}</p>
            <p>touched: {String(model.touched)}</p>
        </div>
    );
};

export const WithDefault = Template.bind({});

(WithDefault as any).args = {
    required: false,
    type: 'text',
    maxLength: 50,
    minLength: 10,
    'semantic-validation': true,
} as InputProps;
