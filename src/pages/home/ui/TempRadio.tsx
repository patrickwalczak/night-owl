'use client';

import { useState } from 'react';

import { RadioInput } from '@/shared/ui/radioInput/RadioInput';

export const TempRadio = () => {
    const [radioValue, setRadioValue] = useState('');

    console.log(radioValue);

    return (
        <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <RadioInput
                id={'radio'}
                label={'Label'}
                value={'value_1'}
                defaultChecked={true}
                onChange={e => setRadioValue(e.target.value)}
                disabled
            />
        </div>
    );
};
