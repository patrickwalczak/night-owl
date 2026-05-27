'use client';

import { ReactNode } from 'react';

import styles from './stickyContainer.module.scss';

import { useAppSelector } from '@/lib/store/hooks';
import { useIsSticky } from '@/shared/hooks/useIsSticky';
import { mergeClasses } from '@/utils/mergeClasses';

interface StickyContainerWrapperType {
	children: ReactNode | ((props: { isStuck: boolean }) => ReactNode);
	className?: string;
}

const StickyContainerWrapper = ({ children, className }: StickyContainerWrapperType) => {
	const isNavigationOpen = useAppSelector((state) => state.app.isNavigationOpen);

	const topPx = isNavigationOpen ? 0 : 48;

	const { isStuck, sentinelRef } = useIsSticky(topPx);

	const content = typeof children === 'function' ? children({ isStuck }) : children;

	return (
		<>
			<div ref={sentinelRef} aria-hidden="true" className={className} />

			<div
				className={mergeClasses(
					styles.stickyContainer,
					isStuck && styles.isStuck,
					'flex',
					'align-center',
					'justify-between',
					'transition-200',
					className
				)}
				style={{ top: `${topPx}px` }}
			>
				{content}
			</div>
		</>
	);
};

export default StickyContainerWrapper;
