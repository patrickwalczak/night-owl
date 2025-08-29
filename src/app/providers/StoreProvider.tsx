'use client';

import { useRef, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { AppStore } from '@/lib/store/types';
import { DeviceType } from '@/types/device.model';
import { makeStore } from '@/lib/store';

export default function StoreProvider({ children, device }: { children: ReactNode; device: DeviceType }) {
	const storeRef = useRef<AppStore | null>(null);

	if (!storeRef.current) {
		storeRef.current = makeStore({
			app: { device, isMobile: device === 'mobile', isTablet: device === 'tablet', isDesktop: device === 'desktop' },
		});
	}

	return <Provider store={storeRef.current}>{children}</Provider>;
}
