import Link from 'next/link';

import { getRootCategoriesWithChildren } from '@/entities/category/server';
import { cn } from '@/shared/lib/utils';

import styles from './homeLink.module.scss';

export const HomeLink = async () => {
    const categories = await getRootCategoriesWithChildren();

    return (
        <Link className={cn(styles.shopBtn, 'transition-200')} href={`/category/${categories[0].slug}`}>
            {'Shop now'}
        </Link>
    );
};
