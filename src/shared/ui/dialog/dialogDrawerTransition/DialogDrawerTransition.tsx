'use client';

import { startTransition, useEffect, useState, ViewTransition, useRef } from 'react';

import { cn } from '@/shared/lib/utils';

import { Dialog } from '../Dialog';
import { DrawerBackdrop } from '../DrawerBackdrop';
import { type DialogDrawerProps } from '../types';
import { animateDrawerTransition } from './animateDrawerTransition';
import styles from './dialogDrawerTransition.module.scss';

export const DialogDrawerTransition = ({
    isOpen,
    side = 'right',
    timeout = 300,
    className,
    ...props
}: DialogDrawerProps) => {
    const [visible, setVisible] = useState(false);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        startTransition(() => setVisible(isOpen));
    }, [isOpen]);

    return (
        <>
            {/* <DrawerBackdrop isOpen={isOpen} className={styles.backdrop} /> */}
            {visible && (
                <ViewTransition
                    default={'none'}
                    enter={'auto'}
                    exit={'auto'}
                    onEnter={instance =>
                        animateDrawerTransition(instance, side, 'enter', timeout)}
                    onExit={instance =>
                        animateDrawerTransition(instance, side, 'exit', timeout)}
                >
                    <Dialog {...props} ref={dialogRef} className={cn(styles.drawer, className)} data-side={side} isOpen={true} />
                </ViewTransition>
            )}
        </>
    );
};
