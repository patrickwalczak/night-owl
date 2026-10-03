'use client';

import { type ReactNode } from 'react';

import { useNavigationTopOffset } from '@/features/layout/client';
import { useIsSticky } from '@/shared/lib/hooks/client';
import { cn } from '@/shared/lib/utils';

import styles from './stickyContainer.module.scss';

interface StickyContainerWrapperType {
    children: ReactNode | ((props: { isStuck: boolean }) => ReactNode);
    className?: string;
}

const StickyContainer = ({ children, className }: StickyContainerWrapperType) => {
    const topPx = useNavigationTopOffset();

    const { isStuck, sentinelRef } = useIsSticky(topPx);

    const content = typeof children === 'function' ? children({ isStuck }) : children;

    return (
        <>
            <div ref={sentinelRef} aria-hidden />

            <div
                className={cn(
                    styles.stickyContainer,
                    { [styles.isStuck]: isStuck },
                    className,
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
