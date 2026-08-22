'use client';

import { useEffect, useRef } from 'react';

import { setViewportType } from '@/features/appState';
import { DESKTOP_BREAKPOINT, TABLET_BREAKPOINT } from '@/shared/config';
import { type ViewportType } from '@/shared/model/device.model';

import { useAppDispatch } from '../store/client';

const DESKTOP_QUERY = `(min-width: ${DESKTOP_BREAKPOINT}px)`;
const TABLET_QUERY = `(min-width: ${TABLET_BREAKPOINT}px)`;

const getViewportType = (): ViewportType => {
    if (window.matchMedia(DESKTOP_QUERY).matches) {
        return 'desktop';
    }

    if (window.matchMedia(TABLET_QUERY).matches) {
        return 'tablet';
    }

    return 'mobile';
};

export function useSyncViewportType() {
    const dispatch = useAppDispatch();
    const lastViewportType = useRef<ViewportType | null>(null);

    useEffect(() => {
        const updateViewportType = () => {
            const viewportType = getViewportType();

            if (lastViewportType.current === viewportType) {
                return;
            }

            lastViewportType.current = viewportType;
            dispatch(setViewportType(viewportType));
        };

        const desktopQuery = window.matchMedia(DESKTOP_QUERY);
        const tabletQuery = window.matchMedia(TABLET_QUERY);

        updateViewportType();

        desktopQuery.addEventListener('change', updateViewportType);
        tabletQuery.addEventListener('change', updateViewportType);

        return () => {
            desktopQuery.removeEventListener('change', updateViewportType);
            tabletQuery.removeEventListener('change', updateViewportType);
        };
    }, [dispatch]);
}
