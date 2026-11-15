import { type ComponentPropsWithoutRef } from 'react';

import { cn } from '@/shared/lib/utils';

import styles from './drawer.module.scss';

export const DrawerHeader = ({ className, ...props }: ComponentPropsWithoutRef<'header'>) => (
    <header className={cn(styles.header, className)} {...props} />
);
