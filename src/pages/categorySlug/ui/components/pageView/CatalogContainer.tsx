'use client';

import { useIsDesktop } from '@/features/appState/client';

import CatalogViewDesktop from './CatalogViewDesktop';
import CatalogViewMobile from './CatalogViewMobile';

export default function CatalogContainer() {
    const isDesktop = useIsDesktop();

    return isDesktop ? <CatalogViewDesktop /> : <CatalogViewMobile />;
}
