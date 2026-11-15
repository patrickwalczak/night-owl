import { cn } from '@/shared/lib/utils';

import { FilterParametersSkeleton } from '../FilterParametersSkeleton';
import { FiltersWrapper } from './FiltersWrapper';
import styles from './sideFiltersDesktopSkeleton.module.scss';

export const SideFiltersDesktopSkeleton = () => (
    <FiltersWrapper>
        <div className={styles.skeleton}>
            <span role={'status'} className={'sr-only'}>{'Loading filters...'}</span>

            <div aria-hidden className={styles.content}>
                <div className={styles.subcategories}>
                    {Array.from({ length: 3 }, (_, index) => (
                        <div key={index} className={cn(styles.placeholder, styles.label)} />
                    ))}
                </div>

                <FilterParametersSkeleton />

                <div className={styles.actions}>
                    <div className={cn(styles.placeholder, styles.button)} />
                    <div className={cn(styles.placeholder, styles.button)} />
                </div>
            </div>
        </div>
    </FiltersWrapper>
);
