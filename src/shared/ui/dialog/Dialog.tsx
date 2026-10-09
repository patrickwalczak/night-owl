'use client';

import {
    type MouseEvent,
    useEffect,
    useMemo,
    useRef,
} from 'react';

import { isClickOutsideElement, mergeRefs } from '@/shared/lib/utils';

import { type DialogProps } from './types';

export const Dialog = ({
    children,
    isOpen,
    onClose,
    ref,
    onClick,
    onCancel,
    ...props
}: DialogProps) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const mergedRef = useMemo(() => mergeRefs(dialogRef, ref), [ref]);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen && !dialog.open) dialog.showModal();

        if (!isOpen && dialog.open) dialog.close();
    }, [isOpen]);

    function closeDialog(e: MouseEvent<HTMLDialogElement>) {
        if (isClickOutsideElement(e)) {
            onClose();
        }
    }

    return (
        <dialog
            {...props}
            ref={mergedRef}
            onCancel={(event) => {
                event.preventDefault();
                onClose();
            }}
            onClick={closeDialog}
        >
            {children}
        </dialog>
    );
};
