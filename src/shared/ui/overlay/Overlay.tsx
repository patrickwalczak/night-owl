'use client';

import { useBodyOverflow } from '@/shared/lib/hooks/client';

import styles from './overlay.module.scss';

export const Overlay = ({
    open,
    onClose,
    zIndex = 50,
}: {
    open: boolean;
    onClose: () => void;
    zIndex?: number;
}) => {
    useBodyOverflow(open);

    if (!open) return null;

    return (
        <div
            className={styles.overlay}
            style={{ zIndex }}
            onClick={onClose}
            aria-hidden={'true'}
        />
    );
};
