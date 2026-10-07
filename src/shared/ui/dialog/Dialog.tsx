'use client';

import {
    type ComponentPropsWithRef,
    type MouseEvent,
    type SyntheticEvent,
    useCallback,
    useLayoutEffect,
    useRef,
} from 'react';

import { mergeRefs } from '@/shared/lib/utils';

type DialogAccessibilityType
    = | {
        /**
           * Use when the dialog has a visible title.
           * The value must match the id of the title element.
           */
        'aria-labelledby': string;

        /**
           * Use aria-labelledby OR aria-label, not both.
           */
        'aria-label'?: never;
    }
    | {
        /**
           * Use when the dialog has no visible title.
           * Provides an accessible name for screen readers.
           */
        'aria-label': string;

        /**
           * Use aria-labelledby OR aria-label, not both.
           */
        'aria-labelledby'?: never;
    };

export type DialogProps = Omit<
    ComponentPropsWithRef<'dialog'>,
    'open' | 'onClose' | 'aria-labelledby' | 'aria-label'
>
& DialogAccessibilityType & {
    isOpen: boolean;
    onClose: () => void;
};

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

    const setRef = useCallback((node: HTMLDialogElement | null) => {
        return mergeRefs(dialogRef, ref)(node);
    }, [ref]);

    // Layout effects run before React captures the new ViewTransition snapshot.
    useLayoutEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (isOpen && !dialog.open) dialog.showModal();
        if (!isOpen && dialog.open) dialog.close();
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
        <dialog
            {...props}
            ref={setRef}
            onClose={(event) => {
                // Strict Mode closes and reopens the modal while replaying effects.
                // Its queued close event must not dismiss the reopened dialog.
                if (isOpen && !event.currentTarget.open && dialogRef.current?.isConnected) onClose();
            }}
            onCancel={handleCancel}
            onClick={handleClick}
        >
            {children}
        </dialog>
    );
};
