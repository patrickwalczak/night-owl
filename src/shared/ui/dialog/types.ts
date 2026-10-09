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
