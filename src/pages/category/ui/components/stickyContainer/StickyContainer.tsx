'use client';

import { type ReactNode } from 'react';

import { useNavigationTopOffset } from '@/features/layout/client';
import { useIsSticky } from '@/shared/lib/hooks/client';
import { cn } from '@/shared/lib/utils';

import styles from './stickyContainer.module.scss';

interface StickyContainerWrapperType {
    children: ReactNode | ((props: { isStuck: boolean }) => ReactNode);
}

const StickyContainer = ({ children }: StickyContainerWrapperType) => {
    const topPx = useNavigationTopOffset();

    const { isStuck, sentinelRef } = useIsSticky(topPx);

    const content = typeof children === 'function' ? children({ isStuck }) : children;

    return (
        <>
            <div ref={sentinelRef} aria-hidden={'true'} />

            <div
                className={cn(
                    styles.stickyContainer,
                    isStuck && styles.isStuck,
                    'flex',
                    'align-center',
                    'justify-between',
                    'transition-200',
                )}
                style={{ top: `${topPx}px` }}
            >
                {content}
            </div>
        </>
    );
};

export default StickyContainer;
