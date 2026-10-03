'use client';

import { cn } from '@/shared/lib/utils/cn';

import { toggleFilters } from '../../../../../model/store/categoryUiSlice';
import { useCategoryPageDispatch, useCategoryPageSelector } from '../../../../../model/store/client';
import FilterButton from '../filterButton/FilterButton';
import styles from './sideFiltersButton.module.scss';

const SideFiltersButton = () => {
    const dispatch = useCategoryPageDispatch();
    const areFiltersOpen = useCategoryPageSelector(state => state.categoryUi.areFiltersOpen);
    const label = areFiltersOpen ? 'Hide filters' : 'Show filters';

    const handleClick = () => {
        dispatch(toggleFilters());
    };

    return <FilterButton label={label} handleClick={handleClick} className={cn(styles.btn, 'flex', 'align-center', 'button-empty')} />;
};

export default SideFiltersButton;
