'use client';

import { useState } from 'react';

import { RadioInput } from '@/shared/ui/radioInput/RadioInput';

export const TempRadio = () => {
    const [radioValue, setRadioValue] = useState('');

    return (
        <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <RadioInput
                label={'Color 1'}
                value={'color_1'}
                name={'color'}
                checked={radioValue === 'color_1'}
                onChange={e => setRadioValue(e.target.value)}
            />
        </div>
    );
};
