'use client';

import { type ReactNode } from 'react';

import { useAppSelector } from '@/lib/store/hooks';
import { useIsSticky } from '@/shared/lib/hooks/useIsSticky';
import { mergeClasses } from '@/shared/lib/utils/mergeClasses';

import styles from './stickyContainer.module.scss';

interface StickyContainerWrapperType {
	children: ReactNode | ((props: { isStuck: boolean }) => ReactNode);
}

const StickyContainer = ({ children }: StickyContainerWrapperType) => {
	const isNavigationOpen = useAppSelector((state) => state.app.isNavigationOpen);

	const topPx = isNavigationOpen ? 0 : 48;

	const { isStuck, sentinelRef } = useIsSticky(topPx);

	const content = typeof children === 'function' ? children({ isStuck }) : children;

	return (
		<>
			<div ref={sentinelRef} aria-hidden={'true'} />

			<div
				className={mergeClasses(
					styles.stickyContainer,
					isStuck && styles.isStuck,
					'flex',
					'align-center',
					'justify-between',
					'transition-200'
				)}
				style={{ top: `${topPx}px` }}
			>
				{content}
			</div>
		</>
	);
};

export default StickyContainer;
