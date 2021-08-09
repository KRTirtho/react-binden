import React, { ComponentPropsWithoutRef, forwardRef } from 'react';
import Input from './components/Input';
import { useModel } from './hooks/useModel';

interface CustomInputProps extends ComponentPropsWithoutRef<'input'> {
    error?: boolean;
    hint?: string;
    label?: string;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(function CustomInput(
    { error, hint, label, ...props },
    ref,
) {
    return <input {...props} ref={ref} />;
});

function App() {
    const model = useModel('');

    console.log(model);

    const emailReg =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneReg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    return (
        <div>
            Form:
            <Input
                as={CustomInput}
                map-props={(props)=>({error: true})}
                model={model}
                maxLength={[20, 'Only 20 okay?']}
                minLength={[5, 'At least 5 please!!!!']}
                pattern={[[emailReg, phoneReg], 'either phone or a email']}
            />
        </div>
    );
}

export default App;
