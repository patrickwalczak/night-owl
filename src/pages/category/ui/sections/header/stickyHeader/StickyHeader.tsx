'use client';

import type { ReactNode } from 'react';

import { useIsSticky } from '@/shared/lib/hooks/useIsSticky/client';
import { useNavigationTopOffset } from '@/shared/lib/hooks/useNavigationLayout/client';
import { cn } from '@/shared/lib/utils';

import styles from './StickyHeader.module.scss';

interface StickyHeaderType {
    children: ReactNode | ((state: { isStuck: boolean }) => ReactNode);
}

export const StickyHeader = ({ children }: StickyHeaderType) => {
    const topPx = useNavigationTopOffset();
    const { isStuck, sentinelRef } = useIsSticky(topPx);

    return (
        <>
            <div ref={sentinelRef} aria-hidden className={styles.sentinel} />
            <header
                data-stuck={isStuck}
                className={cn(styles.header, { [styles.headerIsStuck]: isStuck })}
                style={{ top: `${topPx}px` }}
            >
                {typeof children === 'function' ? children({ isStuck }) : children}
            </header>
        </>
    );
};
