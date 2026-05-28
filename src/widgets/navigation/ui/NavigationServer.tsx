import { getCategoriesAction } from '@/entities/category/api/getCategoriesAction';

import Navigation from './Navigation';

const NavigationServer = async () => {
    const categories = await getCategoriesAction();

    return <Navigation categories={categories} />;
};

export default NavigationServer;
