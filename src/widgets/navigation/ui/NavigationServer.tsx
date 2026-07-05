import { getRootCategoriesWithChildren } from '@/entities/category/server';

import Navigation from './Navigation';

export const NavigationServer = async () => {
    const categories = await getRootCategoriesWithChildren();

    return <Navigation categories={categories} />;
};
