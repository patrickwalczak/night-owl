import type { SVGProps } from 'react';

import { cn } from '@/shared/lib/utils';

import styles from './filters.module.scss';

type FiltersType = SVGProps<SVGSVGElement>;

export const FiltersIcon = ({ className, ...props }: FiltersType) => {
    return (
        <svg
            aria-hidden={'true'}
            className={cn(styles.icon, className)}
            viewBox={'0 0 25 24'}
            fill={'none'}
            xmlns={'http://www.w3.org/2000/svg'}
            {...props}
        >
            <path d={'M4.5 8H13.5'} />
            <path d={'M17.5 8L20.5 8'} />
            <path d={'M11.5 16L20.5 16'} />
            <path d={'M4.5 16H7.5'} />
            <circle cx={'9.5'} cy={'16'} r={'2'} />
            <circle cx={'15.5'} cy={'8'} r={'2'} />
        </svg>
    );
};
