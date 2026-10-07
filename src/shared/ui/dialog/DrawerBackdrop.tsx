'use client';

import { useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

/** A separate layer survives removal of the dialog's ViewTransition snapshot. */
export const DrawerBackdrop = ({ isOpen, className }: { isOpen: boolean; className: string }) => {
    const mounted = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);

    return mounted && createPortal(
        <div aria-hidden={true} className={className} data-open={isOpen} />,
        document.body,
    );
};
