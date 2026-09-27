'use client';

import { usePathname } from 'next/navigation';

import type { RootCategoriesWithChildren } from '@/entities/category';

import { Navigation } from './Navigation';

export const NavigationWithPathname = ({ categories }: { categories: RootCategoriesWithChildren }) => {
    const pathname = usePathname();

    return <Navigation categories={categories} isHomepage={pathname === '/'} />;
};
