'use client';

import 'client-only';
import { useState, type ReactNode } from 'react';
import { Provider } from 'react-redux';

import { makeStore } from '@/app/store';
import { type DeviceType } from '@/shared/model/device.model';

export default function StoreProvider({
    children,
    initialDeviceType,
}: {
    children: ReactNode;
    initialDeviceType: DeviceType;
}) {
    const [store] = useState(() => {
        return makeStore({
            device: {
                initialDeviceType,
                viewportType: initialDeviceType,
                isViewportReady: false,
            },
            navigation: {
                isNavigationOpen: false,
            },
        });
    });

    return <Provider store={store}>{children}</Provider>;
}
