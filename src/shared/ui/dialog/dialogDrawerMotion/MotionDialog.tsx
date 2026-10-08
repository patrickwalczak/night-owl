'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
    type MouseEvent,
    type SyntheticEvent,
    useCallback,
    useLayoutEffect,
    useRef,
} from 'react';

import { mergeRefs } from '@/shared/lib/utils';

import { type DialogProps } from '../types';

export const MotionDialog = ({
    children,
    isOpen,
    onClose,
    ref,
    onClick,
    onCancel,
    onDrag: _onDrag,
    onDragStart: _onDragStart,
    onDragEnd: _onDragEnd,
    onAnimationStart: _onAnimationStart,
    side,
    timeout,
    onExitComplete,
    ...props
}: DialogProps & {
    side: 'left' | 'right';
    timeout: number;
    onExitComplete: () => void;
}) => {
    const reducedMotion = useReducedMotion();
    const x = reducedMotion ? 0 : side === 'left' ? '-100%' : '100%';
    const dialogRef = useRef<HTMLDialogElement>(null);

    const setRef = useCallback((node: HTMLDialogElement | null) => {
        const cleanup = mergeRefs(dialogRef, ref)(node);
        if (node && isOpen && !node.open) node.showModal();
        return cleanup;
    }, [ref, isOpen]);

    useLayoutEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (isOpen && !dialog.open) dialog.showModal();
    }, [isOpen]);

    useLayoutEffect(() => {
        const dialog = dialogRef.current;
        return () => {
            if (dialog?.open) dialog.close();
        };
    }, []);

    const handleCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
        onCancel?.(event);
        const prevented = event.defaultPrevented;
        // Let the controlled owner finish its exit animation before closing.
        event.preventDefault();
        if (!prevented) onClose();
    };

    // Native <dialog> does not close on backdrop click by default.
    // Click coordinates outside the dialog box are treated as a backdrop click.
    const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
        onClick?.(event);
        if (event.defaultPrevented || event.target !== event.currentTarget) return;
        const dialog = event.currentTarget;
        const rect = dialog.getBoundingClientRect();

        const isClickOutside
            = event.clientX < rect.left
                || event.clientX > rect.right
                || event.clientY < rect.top
                || event.clientY > rect.bottom;

        if (isClickOutside) {
            onClose();
        }
    };

    return (
        <motion.dialog
            {...props}
            ref={setRef}
            data-side={side}
            initial={{ x, opacity: 0 }}
            animate={isOpen ? { x: 0, opacity: 1 } : { x, opacity: 1 }}
            transition={{ duration: reducedMotion ? 0 : timeout / 1000, ease: [0, 0, 0.2, 1], delay: 0 }}
            onAnimationComplete={() => {
                if (!isOpen) {
                    if (dialogRef.current?.open) dialogRef.current.close();
                    onExitComplete();
                }
            }}
            onClose={(event) => {
                if (isOpen && !event.currentTarget.open && dialogRef.current?.isConnected) onClose();
            }}
            onCancel={handleCancel}
            onClick={handleClick}
        >
            {children}
        </motion.dialog>
    );
};
