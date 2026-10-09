import {
    useEffect,
    useId,
    useRef,
    useState,
    type ReactNode,
    type MouseEvent,
} from 'react';
import ReactDOM from 'react-dom';

import { cn } from '@/shared/lib/utils/cn';

import styles from './drawerCore.module.scss';

type AriaProps = {
    ariaLabel?: never;
    ariaLabelledby?: string;
} | {
    ariaLabel?: null | string;
    ariaLabelledby?: never;
};

type DrawerType = AriaProps & {
    /** Defines the horizontal anchor position of the modal. */
    anchor?: 'left' | 'right';
    children: ReactNode;
    /** Whether to render the dialog in document.body using a portal. */
    createPortal?: boolean;
    onClose: () => void;
    open: boolean;
    testClass?: string;
    timeout?: number;
    /** Whether to remove the drawer from the DOM after the exit transition completes. Defaults to true. */
    unmountOnExit?: boolean;
    onExited?: () => void;
};

export const DrawerCoreViewTransition = (
    {
        anchor = 'right',
        ariaLabel,
        ariaLabelledby,
        children,
        createPortal = false,
        onClose,
        onExited,
        open,
        testClass = '',
        timeout = 300,
        unmountOnExit = true,
    }: DrawerType,
) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const id = useId();
    const [mounted, setMounted] = useState(open);

    // https://react.dev/reference/react/useState#storing-information-from-previous-renders
    if (open && !mounted) setMounted(true);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (open) {
            if (!dialog.open) dialog.showModal();
            return;
        }

        if (!dialog.open) return;

        dialog.close();

        let cancelled = false;

        const animations = dialog.getAnimations({ subtree: true });

        Promise.allSettled(
            animations.map(animation => animation.finished),
        ).then(() => {
            if (cancelled) return;

            if (unmountOnExit) setMounted(false);
            onExited?.();
        });

        return () => {
            cancelled = true;
        };
    }, [open, mounted, unmountOnExit, onExited]);

    function closeDialog(e: MouseEvent<HTMLDialogElement>) {
        if (e.target === dialogRef.current) {
            onClose();
        }
    }

    const DrawerElement = (
        <dialog
            className={cn(styles.drawerRoot, 't_drawer_root')}
            data-drawer
            data-side={anchor}
            id={id}
            onClick={closeDialog}
            ref={dialogRef}
            {...ariaLabel && { 'aria-label': ariaLabel }}
            {...ariaLabelledby && { 'aria-labelledby': ariaLabelledby }}
        >
            {children}
        </dialog>
    );

    if (!mounted) return null;

    return createPortal ? ReactDOM.createPortal(DrawerElement, document.body) : DrawerElement;
};
