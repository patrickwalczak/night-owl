'use client';

import React, { useEffect, useRef } from 'react';
import styles from './sideFiltersDesktop.module.scss';
import { mergeClasses } from '@/utils/mergeClasses';
import { useAppSelector } from '@/lib/store/hooks';
import { useSafeContext } from '@/hooks/useSafeContext';
import { CatalogContext } from '../../providers/CatalogProvider';

const FiltersWrapper = ({ children }: { children: React.ReactNode }) => {
	const isNavigationOpen = useAppSelector((s) => s.app.isNavigationOpen);
	const { areFiltersOpen } = useSafeContext(CatalogContext);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;
		el.toggleAttribute('inert', !areFiltersOpen);
		el.setAttribute('aria-hidden', String(!areFiltersOpen));
	}, [areFiltersOpen]);

	return (
		<div
			ref={containerRef}
			data-open={areFiltersOpen}
			className={mergeClasses(styles.filtersContainer, 'transition-200', areFiltersOpen && styles.opened)}
			style={{
				width: areFiltersOpen ? '300px' : '0px',
				top: isNavigationOpen ? '58px' : '101px',
			}}
		>
			{children}
		</div>
	);
};

export default FiltersWrapper;
