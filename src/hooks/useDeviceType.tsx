'use client';

import { DESKTOP_BREAKPOINT, TABLET_BREAKPOINT } from '@/constants';
import { setDevice } from '@/lib/store/features/app/appSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import { DeviceType } from '@/types/device.model';
import { useEffect, useRef } from 'react';

const THROTTLE_MS = 120;

function classify(width: number): DeviceType {
	if (width < TABLET_BREAKPOINT) return 'mobile';
	if (width < DESKTOP_BREAKPOINT) return 'tablet';
	return 'desktop';
}

export function useDeviceType() {
	const dispatch = useAppDispatch();

	const ticking = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		const update = () => {
			const device = classify(window.innerWidth);
			dispatch(setDevice(device));
		};

		const onResize = () => {
			if (ticking.current) return;
			ticking.current = setTimeout(() => {
				ticking.current = null;
				update();
			}, THROTTLE_MS);
		};

		window.addEventListener('resize', onResize, { passive: true });

		return () => {
			if (ticking.current) clearTimeout(ticking.current);
			window.removeEventListener('resize', onResize);
		};
	}, [dispatch]);
}
