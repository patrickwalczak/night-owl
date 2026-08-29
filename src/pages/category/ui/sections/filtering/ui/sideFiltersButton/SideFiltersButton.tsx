'use client';

import { toggleFilters } from '../../../../../model/categoryUiSlice';
import { useCategoryPageDispatch, useCategoryPageSelector } from '../../../../../model/client';
import FilterButton from '../filterButton/FilterButton';
import styles from './sideFiltersButton.module.scss';

const SideFiltersButton = () => {
    const dispatch = useCategoryPageDispatch();
    const areFiltersOpen = useCategoryPageSelector(state => state.categoryUi.areFiltersOpen);
    const label = areFiltersOpen ? 'Hide filters' : 'Show filters';

    const handleClick = () => {
        dispatch(toggleFilters());
    };

    return <FilterButton label={label} handleClick={handleClick} className={styles.btn} />;
};

export default SideFiltersButton;
