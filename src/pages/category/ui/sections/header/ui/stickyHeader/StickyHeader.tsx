'use client';

import { useNavigationTopOffset } from '@/features/layout/client';
import { Subcategories } from '@/pages/category/ui/components/subcategories/Subcategories';
import { useIsSticky } from '@/shared/lib/hooks/client';
import { cn } from '@/shared/lib/utils';

import { StickyBarWide } from './StickyBarWide';
import styles from './StickyHeader.module.scss';

export const StickyHeader = () => {
    const topPx = useNavigationTopOffset();
    const { isStuck, sentinelRef } = useIsSticky(topPx);

    return (
        <>
            <div ref={sentinelRef} aria-hidden className={styles.sentinel} />
            <header
                className={cn(styles.header, { [styles.headerIsStuck]: isStuck })}
                style={{ top: `${topPx}px` }}
            >
                <StickyBarWide isStuck={isStuck} />
                <Subcategories />
            </header>
        </>
    );
};
