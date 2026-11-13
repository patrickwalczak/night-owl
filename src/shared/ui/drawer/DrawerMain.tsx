import { useEffect, useId, useRef, useState, type ReactNode, type MouseEvent, type CSSProperties } from 'react';

import { useBodyOverflow } from '@/shared/lib/hooks/useBodyOverflow/client';
import { cn } from '@/shared/lib/utils/cn';
import { isClickOutsideElement } from '@/shared/lib/utils/isClickOutsideElement';

import styles from './drawer.module.scss';
import { DrawerContext } from './DrawerContext';

export type DrawerPosition = 'left' | 'right';

interface DrawerMainProps {
    'id'?: string;
    /** Accessible name for drawers without Drawer.Heading. Otherwise, include Drawer.Heading. */
    'aria-label'?: string;
    /** Defines the horizontal position of the drawer. */
    'position'?: DrawerPosition;
    'children': ReactNode;
    'onClose': () => void;
    'open': boolean;
    /** Transition duration in milliseconds. Defaults to 300. */
    'transitionDuration'?: number;
    /** Whether to defer mounting until the drawer first opens. Defaults to true. */
    'mountOnEnter'?: boolean;
    /** Whether to remove the drawer from the DOM after the exit transition completes. Defaults to true. */
    'unmountOnExit'?: boolean;
    'onExited'?: () => void;
}

export const DrawerMain = (
    {
        id,
        'aria-label': ariaLabel,
        position = 'right',
        children,
        onClose,
        onExited,
        open,
        transitionDuration = 300,
        mountOnEnter = true,
        unmountOnExit = true,
    }: DrawerMainProps,
) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const headingId = useId();
    const [mounted, setMounted] = useState(open || !mountOnEnter);
    useBodyOverflow(open);

    // https://react.dev/reference/react/useState#storing-information-from-previous-renders
    if (open && !mounted) setMounted(true);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (open && !dialog.open) dialog.showModal();

        if (!open && dialog.open) {
            dialog.close();

            const animations = dialog.getAnimations();

            Promise.allSettled(animations.map(animation => animation.finished)).then(() => {
                onExited?.();
                if (unmountOnExit) setMounted(false);
            });
        }
    }, [open, mounted, unmountOnExit, onExited]);

    function closeDialog(e: MouseEvent<HTMLDialogElement>) {
        if (isClickOutsideElement(e)) onClose();
    }

    if (!mounted) return null;

    return (
        <dialog
            id={id}
            className={cn(styles.drawerRoot, 't_drawer_root', {
                [styles.drawerRootIsLeft]: position === 'left',
            })}
            style={{ '--drawer-transition-duration': `${transitionDuration}ms` } as CSSProperties}
            onClick={closeDialog}
            onCancel={(event) => {
                event.preventDefault();
                onClose();
            }}
            ref={dialogRef}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabel ? undefined : headingId}
        >
            <DrawerContext.Provider value={{ onClose, headingId }}>
                {children}
            </DrawerContext.Provider>
        </dialog>
    );
};
