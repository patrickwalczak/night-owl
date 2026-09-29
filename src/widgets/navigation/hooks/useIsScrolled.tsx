import { useEffect } from 'react';

import { useSetNavigationVisibility } from '@/features/layout/client';
import { NAVIGATION_HEIGHT_PX } from '@/shared/config';
import { useWindowScroll } from '@/shared/lib/hooks/client';

export const useIsScrolled = () => {
    const setNavigationVisibility = useSetNavigationVisibility();
    const { scrollY, direction } = useWindowScroll();
    const isScrolled = scrollY >= NAVIGATION_HEIGHT_PX;
    const isNavigationVisible = direction !== 'down';

    useEffect(() => {
        setNavigationVisibility(isNavigationVisible);
    }, [isNavigationVisible, setNavigationVisibility]);

    return { isScrolled, direction };
};
