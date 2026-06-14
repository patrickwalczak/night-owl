'use client';

import { useEffect, useRef } from 'react';

import { setDevice } from '@/features/appState/model/appSlice';
import { DESKTOP_BREAKPOINT, TABLET_BREAKPOINT } from '@/shared/config/breakpoints';
import { useAppDispatch } from '@/shared/lib/redux';
import { type DeviceType } from '@/shared/model/device.model';

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
