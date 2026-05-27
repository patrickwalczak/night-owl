'use client';

import { useAppSelector } from '@/lib/store/hooks';
import CatalogViewDesktop from './CatalogViewDesktop';
import CatalogViewMobile from './CatalogViewMobile';

export default function CatalogContainer() {
	const isDesktop = useAppSelector((state) => state.app.isDesktop);

	return isDesktop ? <CatalogViewDesktop /> : <CatalogViewMobile />;
}
