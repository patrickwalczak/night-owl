'use client';

import { type ReactNode, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export const useDrawerPortal = (element: ReactNode, enabled: boolean) => {
    const mounted = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
    return enabled ? mounted ? createPortal(element, document.body) : null : element;
};
