'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { cn } from '@/shared/lib/utils';

import { Dialog } from '../Dialog';
import { DrawerBackdrop } from '../DrawerBackdrop';
import { type DialogDrawerProps } from '../types';
import styles from './dialogDrawerMotion.module.scss';

const MotionDialog = motion.create(Dialog);

export const DialogDrawerMotion = ({
    isOpen,
    side = 'right',
    timeout = 300,
    className,
    ...props }: DialogDrawerProps) => {
    const reducedMotion = useReducedMotion();
    const x = reducedMotion ? 0 : side === 'left' ? '-100%' : '100%';

    return (
        <>
            <DrawerBackdrop isOpen={isOpen} className={styles.backdrop} />
            <AnimatePresence>
                {isOpen && (
                    <MotionDialog
                        {...props}
                        key={'drawer'}
                        isOpen={true}
                        className={cn(styles.drawer, className)}
                        data-side={side}
                        initial={{ x, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x, opacity: 1 }}
                        transition={{ duration: reducedMotion ? 0 : timeout / 1000, ease: [0, 0, 0.2, 1], delay: 0 }}
                    />
                )}
            </AnimatePresence>
        </>
    );
};
