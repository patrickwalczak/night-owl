import { type ComponentPropsWithRef } from 'react';

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

type DrawerProps<T> = T extends unknown
    ? Omit<T, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'>
    : never;

export type DialogDrawerProps = DrawerProps<DialogProps> & {
    side?: 'left' | 'right';
    /** Animation duration in milliseconds. Defaults to 300. */
    timeout?: number;
    /** Mount the drawer and its backdrop in document.body. Defaults to false. */
    createPortal?: boolean;
    /** Remove drawer content after exit. Set false to preserve its state. Defaults to true. */
    unmountOnExit?: boolean;
};
