import {
    useEffect,
    useRef,
    useState,
    type ReactNode,
    type MouseEvent,
    type CSSProperties,
} from 'react';

import { cn } from '@/shared/lib/utils/cn';
import { isClickOutsideElement } from '@/shared/lib/utils/isClickOutsideElement';

import styles from './drawer.module.scss';

type AriaProps = {
    ariaLabel?: never;
    ariaLabelledby: string;
} | {
    ariaLabel: string;
    ariaLabelledby?: never;
};

export type DrawerPosition = 'left' | 'right';

type DrawerType = AriaProps & {
    /** Defines the horizontal position of the modal. */
    position?: DrawerPosition;
    children: ReactNode;
    onClose: () => void;
    open: boolean;
    /** Transition duration in milliseconds. Defaults to 300. */
    transitionDuration?: number;
    /** Whether to defer mounting until the drawer first opens. Defaults to true. */
    mountOnEnter?: boolean;
    /** Whether to remove the drawer from the DOM after the exit transition completes. Defaults to true. */
    unmountOnExit?: boolean;
    onExited?: () => void;
};

export const Drawer = (
    {
        position = 'right',
        ariaLabel,
        ariaLabelledby,
        children,
        onClose,
        onExited,
        open,
        transitionDuration = 300,
        mountOnEnter = true,
        unmountOnExit = true,
    }: DrawerType,
) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [mounted, setMounted] = useState(open || !mountOnEnter);

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
            aria-labelledby={ariaLabelledby}
        >
            {children}
        </dialog>
    );
};
