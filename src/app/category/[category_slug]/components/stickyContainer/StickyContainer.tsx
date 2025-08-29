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

const StickyContainer = () => {
	const isDesktop = useAppSelector((state) => state.app.isDesktop);
	const isNavigationOpen = useAppSelector((state) => state.app.isNavigationOpen);

	return (
		<div
			className={mergeClasses(styles.stickyContainer, 'flex', 'align-center', 'justify-between', 'transition-200')}
			style={{ top: isNavigationOpen ? '0px' : '48px' }}
		>
			{isDesktop ? <CategoryName isProductSum /> : <CategoryProductsTotal />}
			<div className={mergeClasses('flex', 'align-center', 'gap-1')}>
				{isDesktop ? <SideFiltersButton /> : <FiltersDialog />}
				{isDesktop ? <SortDropdown /> : null}
			</div>
		</div>
	);
};

export default StickyContainer;
