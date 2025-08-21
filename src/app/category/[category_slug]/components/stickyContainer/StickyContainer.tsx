'use client';

import React from 'react';
import styles from './stickyContainer.module.scss';
import { useAppSelector } from '@/lib/store/hooks';
import { mergeClasses } from '@/utils/mergeClasses';
import CategoryProductsTotal from '../categoryProductsTotal/CategoryProductsTotal';
import SideFiltersButton from '../sideFiltersButton/SideFiltersButton';
import CategoryName from '../categoryName/CategoryName';
import FiltersDialog from '../filtersDialogMobile/FiltersDialog';

const StickyContainer = () => {
	const isDesktop = useAppSelector((state) => state.app.isDesktop);
	const isNavigationOpen = useAppSelector((state) => state.app.isNavigationOpen);

	return (
		<div
			className={mergeClasses(styles.stickyContainer, 'flex', 'align-center', 'justify-between', 'transition-200')}
			style={{ top: isNavigationOpen ? '0px' : '43px' }}
		>
			{isDesktop ? <CategoryName isProductSum /> : <CategoryProductsTotal />}
			{isDesktop ? <SideFiltersButton /> : <FiltersDialog />}
		</div>
	);
};

export default StickyContainer;
