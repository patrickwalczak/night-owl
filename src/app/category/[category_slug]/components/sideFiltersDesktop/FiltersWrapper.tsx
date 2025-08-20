import React from 'react';
import styles from './sideFiltersDesktop.module.scss';
import { mergeClasses } from '@/utils/mergeClasses';
import { useAppSelector } from '@/lib/store/hooks';

const FiltersWrapper = ({ children }: { children: React.ReactNode }) => {
	const isNavigationOpen = useAppSelector((state) => state.order.isNavigationOpen);
	const isOpened = useAppSelector((state) => state.catalog.ui.areFiltersOpen);

	return (
		<div
			className={mergeClasses(styles.filtersContainer, 'transition-200', isOpened && styles.opened)}
			style={{ width: isOpened ? '300px' : `0px`, top: isNavigationOpen ? '58px' : '101px' }}
		>
			{children}
		</div>
	);
};

export default FiltersWrapper;
