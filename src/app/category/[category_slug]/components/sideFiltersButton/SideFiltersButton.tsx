'use client';

import React from 'react';
import FilterButton from '../filterButton/FilterButton';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { toggleFilters } from '@/lib/store/features/catalog/catalogSlice';
import { setBoolCookieClient } from '@/utils/cookie';
import styles from './sideFiltersButton.module.scss';

const SideFiltersButton = () => {
	const dispatch = useAppDispatch();
	const isOpened = useAppSelector((state) => state.catalog.ui.areFiltersOpen);
	const label = isOpened ? 'Hide filters' : 'Show filters';

	const handleClick = () => {
		dispatch(toggleFilters());
		setBoolCookieClient('areFiltersOpen', !isOpened, {
			maxAge: 60 * 60 * 24 * 365,
			sameSite: 'lax',
			path: '/',
		});
	};

	return <FilterButton label={label} handleClick={handleClick} className={styles.btn} />;
};

export default SideFiltersButton;
