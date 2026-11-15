import { cn } from '@/shared/lib/utils';

import styles from './filterParametersSkeleton.module.scss';

export const FilterParametersSkeleton = () => (
    <div>
        <span role={'status'} className={'sr-only'}>{'Loading filters...'}</span>
        <div aria-hidden className={styles.parameters}>
            {Array.from({ length: 6 }, (_, index) => (
                <div key={index} className={styles.parameter}>
                    <div className={cn(styles.placeholder, styles.label)} />
                    <div className={cn(styles.placeholder, styles.icon)} />
                </div>
            ))}
        </div>
    </div>
);
