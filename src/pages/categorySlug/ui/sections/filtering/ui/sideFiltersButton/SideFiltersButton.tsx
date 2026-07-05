'use client';

import { setBoolCookieClient } from '@/shared/lib/utils/cookie/client';

import { useCatalog } from '../../../../../model/providers/CatalogProvider';
import FilterButton from '../filterButton/FilterButton';
import styles from './sideFiltersButton.module.scss';

const SideFiltersButton = () => {
    const { areFiltersOpen, toggleFilters } = useCatalog();
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
