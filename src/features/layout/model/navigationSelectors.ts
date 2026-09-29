import { NAVIGATION_HEIGHT_PX } from '@/shared/config';

import { type NavigationState } from './navigationSlice';

interface NavigationStateRoot {
    navigation: NavigationState;
}

export const selectIsNavigationVisible = (state: NavigationStateRoot) => state.navigation.isNavigationVisible;

export const selectNavigationTopOffset = (state: NavigationStateRoot) => (
    selectIsNavigationVisible(state) ? NAVIGATION_HEIGHT_PX : 0
);
