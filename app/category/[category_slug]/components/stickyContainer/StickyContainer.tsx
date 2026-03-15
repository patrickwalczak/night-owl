'use client';

import React from 'react';
import styles from './stickyContainer.module.scss';
import { useAppSelector } from '@/lib/store/hooks';
import { mergeClasses } from '@/utils/mergeClasses';
import CategoryProductsTotal from '../categoryProductsTotal/CategoryProductsTotal';
import SideFiltersButton from '../sideFiltersButton/SideFiltersButton';
import CategoryName from '../categoryName/CategoryName';
import FiltersDialog from '../filtersDialogMobile/FiltersDialog';
import SortDropdown from '../sortDropdown/SortDropdown';
import { useIsSticky } from '@/hooks/useIsSticky';

const StickyContainer = () => {
	const isDesktop = useAppSelector((s) => s.app.isDesktop);
	const isNavigationOpen = useAppSelector((s) => s.app.isNavigationOpen);
	const topPx = isNavigationOpen ? 0 : 48;
	const { isStuck, sentinelRef } = useIsSticky(topPx);

	return (
		<>
			<div ref={sentinelRef} aria-hidden="true" />

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
				{isDesktop ? <CategoryName isStuck={isStuck} isProductSum /> : <CategoryProductsTotal />}
				<div className={mergeClasses('flex', 'align-center', 'gap-1')}>
					{isDesktop ? <SideFiltersButton /> : <FiltersDialog />}
					{isDesktop ? <SortDropdown /> : null}
				</div>
			</div>
		</>
	);
};

export default StickyContainer;
