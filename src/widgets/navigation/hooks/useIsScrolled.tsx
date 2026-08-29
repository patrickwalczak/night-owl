import { useEffect } from 'react';

import { useNavigationHeight, useSetNavigationVisibility } from '@/features/appState/client';
import { useWindowScroll } from '@/shared/lib/hooks/client';

export const useIsScrolled = () => {
    const navigationHeight = useNavigationHeight();
    const setNavigationVisibility = useSetNavigationVisibility();
    const { scrollY, direction } = useWindowScroll();
    const isScrolled = scrollY >= navigationHeight;
    const isNavigationVisible = direction !== 'down';

    useEffect(() => {
        setNavigationVisibility(isNavigationVisible);
    }, [isNavigationVisible, setNavigationVisibility]);

    return { isScrolled, direction };
};
