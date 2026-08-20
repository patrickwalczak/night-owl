'use client';

import { useCatalog } from '../../../../../model/providers/CatalogProvider';
import FilterButton from '../filterButton/FilterButton';
import styles from './sideFiltersButton.module.scss';

const SideFiltersButton = () => {
    const { areFiltersOpen, toggleFilters } = useCatalog();
    const label = areFiltersOpen ? 'Hide filters' : 'Show filters';

    const handleClick = () => {
        toggleFilters();
    };

    return <FilterButton label={label} handleClick={handleClick} className={styles.btn} />;
};

export default SideFiltersButton;
