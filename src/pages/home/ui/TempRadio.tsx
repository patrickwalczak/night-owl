'use client';

import { useState } from 'react';

import { Checkbox } from '@/shared/ui/checkbox/Checkbox';

export const TempRadio = () => {
    const [radioValue, setRadioValue] = useState('');

    return (
        <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Checkbox label={'test'} name={'test'} value={'test'} onChange={() => setRadioValue('test')} checked={radioValue === 'test'} />
        </div>
    );
};
