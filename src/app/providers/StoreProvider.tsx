'use client';

import 'client-only';
import { useState, type ReactNode } from 'react';
import { Provider } from 'react-redux';

import { makeStore } from '@/app/store';
import { type DeviceType } from '@/shared/model/device.model';

export default function StoreProvider({ children, device }: { children: ReactNode; device: DeviceType }) {
    const [store] = useState(() => {
        return makeStore({
            app: { device, isMobile: device === 'mobile', isTablet: device === 'tablet', isDesktop: device === 'desktop' },
        });
    });

    return <Provider store={store}>{children}</Provider>;
}
