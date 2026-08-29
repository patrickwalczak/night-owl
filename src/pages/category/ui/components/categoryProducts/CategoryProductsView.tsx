'use client';

import { useIsDesktop } from '@/features/layout/client';

import CategoryProductsDesktop from './CategoryProductsDesktop';
import CategoryProductsMobile from './CategoryProductsMobile';

export default function CategoryProductsView() {
    const isDesktop = useIsDesktop();

    return isDesktop ? <CategoryProductsDesktop /> : <CategoryProductsMobile />;
}
