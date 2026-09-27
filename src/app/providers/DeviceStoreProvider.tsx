import 'server-only';
import { headers } from 'next/headers';
import { type ReactNode } from 'react';

import { isDeviceType } from '@/shared/model/device.model';

import StoreProvider from './StoreProvider';

export default async function DeviceStoreProvider({ children }: { children: ReactNode }) {
    const deviceTypeHeader = (await headers()).get('x-device-type');
    const initialDeviceType = isDeviceType(deviceTypeHeader) ? deviceTypeHeader : 'desktop';

    return <StoreProvider initialDeviceType={initialDeviceType}>{children}</StoreProvider>;
}
