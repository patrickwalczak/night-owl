'use client';

import type { ReactNode } from 'react';

import { useIsSticky } from '@/shared/lib/hooks/useIsSticky/client';
import { useNavigationTopOffset } from '@/shared/lib/hooks/useNavigationLayout/client';
import { cn } from '@/shared/lib/utils';

import { Subcategories } from '../../../components/subcategories/Subcategories';
import { StickyBarWide } from './StickyBarWide';
import styles from './StickyHeader.module.scss';

export const StickyHeader = ({ productCount }: { productCount: ReactNode }) => {
    const topPx = useNavigationTopOffset();
    const { isStuck, sentinelRef } = useIsSticky(topPx);

    return (
        <>
            <div ref={sentinelRef} aria-hidden className={styles.sentinel} />
            <header
                className={cn(styles.header, { [styles.headerIsStuck]: isStuck })}
                style={{ top: `${topPx}px` }}
            >
                <StickyBarWide isStuck={isStuck} productCount={productCount} />
                <Subcategories />
            </header>
        </>
    );
};
