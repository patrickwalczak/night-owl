import {
    useEffect,
    useId,
    useRef,
    useState,
    type ReactNode,
    type MouseEvent,
    type CSSProperties,
} from 'react';
import ReactDOM from 'react-dom';

import { cn } from '@/shared/lib/utils/cn';
import { isClickOutsideElement } from '@/shared/lib/utils/isClickOutsideElement';

import styles from './drawer.module.scss';

type AriaProps = {
    ariaLabel?: never;
    ariaLabelledby?: string;
} | {
    ariaLabel?: null | string;
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
    transitionDuratio?: number;
    /**
     * When true (default), the drawer is added to the DOM only when first opened.
     * When false, the drawer is added to the DOM immediately, but stays hidden until opened.
     * After closing, unmountOnExit=true removes it after the exit animation;
     * unmountOnExit=false keeps it in the DOM, hidden.
     */
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
        transitionDuratio = 300,
        mountOnEnter = true,
        unmountOnExit = true,
    }: DrawerType,
) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const id = useId();
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
        if (isClickOutsideElement(e)) {
            onClose();
        }
    }

    const DrawerElement = (
        <dialog
            className={cn(styles.drawerRoot, 't_drawer_root', {
                [styles.drawerRootIsLeft]: position === 'left',
            })}
            style={{ '--drawer-transition-duration': `${transitionDuratio}ms` } as CSSProperties}
            data-drawer
            id={id}
            onClick={closeDialog}
            onCancel={(event) => {
                event.preventDefault();
                onClose();
            }}
            ref={dialogRef}
            {...ariaLabel && { 'aria-label': ariaLabel }}
            {...ariaLabelledby && { 'aria-labelledby': ariaLabelledby }}
        >
            {children}
        </dialog>
    );

    if (!mounted) return null;

    return DrawerElement;
};
