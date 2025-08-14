import React from 'react';
import styles from './sideFiltersDesktop.module.scss';
import { mergeClasses } from '@/utils/mergeClasses';
import { useAppSelector } from '@/lib/store/hooks';

const FiltersWrapper = ({ children }: { children: React.ReactNode }) => {
	const isOpened = useAppSelector((state) => state.catalog.ui.areFiltersOpen);

	return (
		<div
			className={mergeClasses(styles.filtersContainer, 'transition-200')}
			style={{ width: isOpened ? '300px' : `0px` }}
		>
			{children}
		</div>
	);
};

export default FiltersWrapper;
