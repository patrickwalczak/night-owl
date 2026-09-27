import { Suspense } from 'react';

import { getRootCategoriesWithChildren } from '@/entities/category/server';

import { Navigation } from './Navigation';
import { NavigationWithPathname } from './NavigationWithPathname';

export const NavigationServer = async () => {
    const categories = await getRootCategoriesWithChildren();

    return (
        <Suspense fallback={<Navigation categories={categories} isHomepage={false} />}>
            <NavigationWithPathname categories={categories} />
        </Suspense>
    );
};
