import {
    useEffect,
    useId,
    useRef,
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

    // Keep a stable ref to onClose so the event listener never needs re-attaching
    const onCloseRef = useRef(onClose);
    useEffect(() => {
        onCloseRef.current = onClose;
    }, [onClose]);

    // Show/hide in response to the `open` prop
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (open) {
            if (!dialog.open) {
                dialog.showModal();
            }
        }
        else {
            if (dialog.open) {
                dialog.close();
            }
        }
    }, [open]);

    function closeDialog(e: MouseEvent<HTMLDialogElement>) {
        if (e.target === dialogRef.current) {
            onCloseRef.current();
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

    return createPortal ? ReactDOM.createPortal(DrawerElement, document.body) : DrawerElement;
};
