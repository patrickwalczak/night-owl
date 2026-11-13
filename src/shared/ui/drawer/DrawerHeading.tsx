import { type ComponentPropsWithoutRef } from 'react';

import { useSafeContext } from '@/shared/lib/hooks/useSafeContext/client';
import { cn } from '@/shared/lib/utils/cn';

import styles from './drawer.module.scss';
import { DrawerContext } from './DrawerContext';

export const DrawerHeading = ({ className, ...props }: Omit<ComponentPropsWithoutRef<'h3'>, 'id'>) => {
    const { headingId } = useSafeContext(DrawerContext);
    return <h3 {...props} id={headingId} className={cn(styles.heading, className)} />;
};
