'use client';

import React from 'react';
import FilterButton from '../filterButton/FilterButton';
import { setBoolCookieClient } from '@/utils/cookie';
import styles from './sideFiltersButton.module.scss';
import { CatalogContext } from '../../providers/CatalogProvider';
import { useSafeContext } from '@/hooks/useSafeContext';

const SideFiltersButton = () => {
	const { areFiltersOpen, toggleFilters } = useSafeContext(CatalogContext);
	const label = areFiltersOpen ? 'Hide filters' : 'Show filters';

	const handleClick = () => {
		toggleFilters();
		setBoolCookieClient('areFiltersOpen', !areFiltersOpen, {
			maxAge: 60 * 60 * 24 * 365,
			sameSite: 'lax',
			path: '/',
		});
	};

	return <FilterButton label={label} handleClick={handleClick} className={styles.btn} />;
};

export default SideFiltersButton;
