'use client';

import {
    type ComponentPropsWithRef,
    type MouseEvent,
    useEffect,
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

type DialogType = Omit<
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
    ...props
}: DialogType) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;

        if (!dialog) {
            return;
        }

        if (isOpen && !dialog.open) {
            dialog.showModal();
            return;
        }

        if (!isOpen && dialog.open) {
            dialog.close();
        }

        return () => {
            if (dialog.open) {
                dialog.close();
            }
        };
    }, [isOpen]);

    // Native <dialog> does not close on backdrop click by default.
    // Click coordinates outside the dialog box are treated as a backdrop click.
    const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
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
            ref={mergeRefs(dialogRef, ref)}
            onClose={onClose}
            onClick={handleClick}
        >
            {children}
        </dialog>
    );
};
