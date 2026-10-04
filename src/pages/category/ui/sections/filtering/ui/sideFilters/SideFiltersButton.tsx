'use client';

import { COOKIES } from '@/shared/config';
import { setCookie } from '@/shared/lib/cookies/client';
import { cn } from '@/shared/lib/utils/cn';
import { FiltersIcon } from '@/shared/ui/icons';

import { toggleFilters } from '../../../../../model/store/categoryUiSlice';
import { useCategoryPageDispatch, useCategoryPageSelector } from '../../../../../model/store/client';
import styles from './sideFiltersButton.module.scss';

const SideFiltersButton = () => {
    const dispatch = useCategoryPageDispatch();
    const areFiltersOpen = useCategoryPageSelector(state => state.categoryUi.areFiltersOpen);
    const label = areFiltersOpen ? 'Hide filters' : 'Show filters';

    const handleClick = () => {
        dispatch(toggleFilters());

        setCookie(COOKIES.areFiltersOpen.name, areFiltersOpen ? '0' : '1', {
            path: '/',
            sameSite: 'lax',
            expires: Date.now() + 30 * 24 * 60 * 60 * 1000,
        }).catch((error) => {
            console.error('Failed to save filters preference cookie.', error);
        });
    };

    return (
        <button onClick={handleClick} className={cn(styles.btn, 'flex', 'align-center', 'button-empty')}>
            {label}
            <FiltersIcon />
        </button>
    );
};

export default SideFiltersButton;
