'use client';

import { COOKIES } from '@/shared/config';
import { setCookie } from '@/shared/lib/cookies/client';
import { cn } from '@/shared/lib/utils';
import { FiltersIcon } from '@/shared/ui/icons';

import { useCategoryPageContext } from '../../../../model/categoryPageContext';
import styles from './sideFiltersButton.module.scss';

export const SideFiltersButton = () => {
    const { toggleFilters, areFiltersOpen } = useCategoryPageContext();
    const label = areFiltersOpen ? 'Hide filters' : 'Show filters';

    const handleClick = () => {
        toggleFilters();

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
