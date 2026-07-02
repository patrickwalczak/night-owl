import { getCategories } from '@/entities/category/server';

import Navigation from './Navigation';

const NavigationServer = async () => {
    const categories = await getCategories();

    return <Navigation categories={categories} />;
};

export default NavigationServer;
