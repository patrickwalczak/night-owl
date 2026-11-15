import { NAVIGATION_HEIGHT_PX } from '@/shared/config';
import { useWindowScrollSelector, type ScrollState } from '@/shared/lib/hooks/useWindowScroll/client';

const selectIsNavigationVisible = ({ direction }: ScrollState) => direction !== 'down';
const selectIsScrolled = ({ scrollY }: ScrollState) => scrollY >= NAVIGATION_HEIGHT_PX;
const getNavigationTopOffset = (isNavigationVisible: boolean) => isNavigationVisible ? NAVIGATION_HEIGHT_PX : 0;

const selectNavigationTopOffset = (state: ScrollState) => {
    const isNavigationVisible = selectIsNavigationVisible(state);
    return getNavigationTopOffset(isNavigationVisible);
};

export const useNavigationLayout = () => {
    const isNavigationVisible = useWindowScrollSelector(selectIsNavigationVisible);
    const isScrolled = useWindowScrollSelector(selectIsScrolled);

    return {
        isNavigationVisible,
        isScrolled,
        navigationTopOffset: getNavigationTopOffset(isNavigationVisible),
    };
};

// Sticky elements only subscribe to the offset, not to every scroll position change.
export const useNavigationTopOffset = () => useWindowScrollSelector(selectNavigationTopOffset);
