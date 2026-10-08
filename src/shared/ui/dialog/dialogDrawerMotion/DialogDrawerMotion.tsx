'use client';

import { useState } from 'react';

import { cn } from '@/shared/lib/utils';

import { DrawerBackdrop } from '../DrawerBackdrop';
import { type DialogDrawerProps } from '../types';
import { useDrawerPortal } from '../useDrawerPortal';
import styles from './dialogDrawerMotion.module.scss';
import { MotionDialog } from './MotionDialog';

export const DialogDrawerMotion = ({
    isOpen,
    side = 'right',
    timeout = 300,
    createPortal = false,
    unmountOnExit = true,
    className,
    ...props
}: DialogDrawerProps) => {
    const [mounted, setMounted] = useState(isOpen);
    // Keep content mounted until exit completes, including a rapid reopen.
    if (isOpen && !mounted) setMounted(true);

    const drawerElement = (
        <>
            <DrawerBackdrop isOpen={isOpen} className={styles.backdrop} />
            {(mounted || !unmountOnExit) && (
                <MotionDialog
                    {...props}
                    className={cn(styles.drawer, className)}
                    isOpen={isOpen}
                    side={side}
                    timeout={timeout}
                    onExitComplete={() => setMounted(false)}
                />
            )}
        </>
    );

    return useDrawerPortal(drawerElement, createPortal);
};
