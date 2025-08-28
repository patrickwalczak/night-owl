import React from 'react';
import styles from './sideFiltersDesktop.module.scss';
import { mergeClasses } from '@/utils/mergeClasses';
import { useAppSelector } from '@/lib/store/hooks';
import { useSafeContext } from '@/hooks/useSafeContext';
import { CatalogContext } from '../catalog/CatalogProvider';

const FiltersWrapper = ({ children }: { children: React.ReactNode }) => {
	const isNavigationOpen = useAppSelector((state) => state.app.isNavigationOpen);
	const { areFiltersOpen } = useSafeContext(CatalogContext);

	return (
		<div
			className={mergeClasses(styles.filtersContainer, 'transition-200', areFiltersOpen && styles.opened)}
			style={{ width: areFiltersOpen ? '300px' : `0px`, top: isNavigationOpen ? '58px' : '101px' }}
		>
			{children}
		</div>
	);
};

export default FiltersWrapper;
