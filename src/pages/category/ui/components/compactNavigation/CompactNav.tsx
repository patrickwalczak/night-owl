'use client';

import { type ReactNode } from 'react';

import { cn } from '@/shared/lib/utils/cn';

import styles from './CompactNav.module.scss';

export const CompactNav = ({ children }: { children: ReactNode }) => {
    return (
        <nav className={cn(styles.nav, 'flex', 'align-center')}>
            {children}
        </nav>
    );
};
