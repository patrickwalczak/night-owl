import { getCategoriesAction } from '@/actions/getCategoriesAction';
import React from 'react';
import Navigation from '../navigation/Navigation';

const NavigationServer = async () => {
	const categories = await getCategoriesAction();

	return <Navigation categories={categories} />;
};

export default NavigationServer;
