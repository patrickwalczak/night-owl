'use client';

import { setBoolCookieClient } from '@/shared/lib/utils/cookie/client';

import { toggleFilters } from '../../../../../model/catalogSlice';
import { useCatalogDispatch, useCatalogSelector } from '../../../../../model/client';
import FilterButton from '../filterButton/FilterButton';
import styles from './sideFiltersButton.module.scss';

const SideFiltersButton = () => {
    const dispatch = useCatalogDispatch();
    const areFiltersOpen = useCatalogSelector(state => state.catalog.areFiltersOpen);
    const label = areFiltersOpen ? 'Hide filters' : 'Show filters';

    const handleClick = () => {
        dispatch(toggleFilters());
        setBoolCookieClient('areFiltersOpen', !areFiltersOpen, {
            maxAge: 60 * 60 * 24 * 365,
            sameSite: 'lax',
            path: '/',
        });
    };

    return <FilterButton label={label} handleClick={handleClick} className={styles.btn} />;
};

export default SideFiltersButton;
