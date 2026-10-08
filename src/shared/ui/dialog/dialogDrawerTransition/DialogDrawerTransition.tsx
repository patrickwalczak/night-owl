'use client';

import { Activity, startTransition, useEffect, useState, ViewTransition } from 'react';

import { cn } from '@/shared/lib/utils';

import { DrawerBackdrop } from '../DrawerBackdrop';
import { type DialogDrawerProps } from '../types';
import { useDrawerPortal } from '../useDrawerPortal';
import { animateDrawerTransition } from './animateDrawerTransition';
import styles from './dialogDrawerTransition.module.scss';
import { TransitionDialog } from './TransitionDialog';

export const DialogDrawerTransition = ({
    isOpen,
    side = 'right',
    timeout = 300,
    createPortal = false,
    unmountOnExit = true,
    className,
    ...props
}: DialogDrawerProps) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        startTransition(() => {
            setVisible(isOpen);
        });
    }, [isOpen]);

    const drawerElement = (
        <>
            <DrawerBackdrop isOpen={isOpen} className={styles.backdrop} />
            {(visible || !unmountOnExit) && (
                <Activity mode={visible ? 'visible' : 'hidden'}>
                    <ViewTransition
                        default={'none'}
                        enter={'auto'}
                        exit={'auto'}
                        onEnter={instance =>
                            animateDrawerTransition(instance, side, 'enter', timeout)}
                        onExit={instance =>
                            animateDrawerTransition(instance, side, 'exit', timeout)}
                    >
                        <TransitionDialog {...props} className={cn(styles.drawer, className)} data-side={side} isOpen={visible} />
                    </ViewTransition>
                </Activity>
            )}
        </>
    );

    return useDrawerPortal(drawerElement, createPortal);
};
