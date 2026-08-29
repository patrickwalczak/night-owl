import { NAVIGATION_HEIGHT_PX } from '@/shared/config';
import {
    DEFAULT_RESPONSIVE_STRATEGY,
    type ResponsiveStrategy,
} from '@/shared/model/device.model';

import { selectResponsiveType } from './deviceSelectors';
import { type DeviceState } from './deviceSlice';
import { type NavigationState } from './navigationSlice';

interface DeviceStateRoot {
    device: DeviceState;
}

interface NavigationStateRoot {
    navigation: NavigationState;
}

type LayoutStateRoot = DeviceStateRoot & NavigationStateRoot;

export const selectIsNavigationVisible = (state: NavigationStateRoot) => state.navigation.isNavigationVisible;

export const selectNavigationHeight = (
    state: DeviceStateRoot,
    strategy: ResponsiveStrategy = DEFAULT_RESPONSIVE_STRATEGY,
) => NAVIGATION_HEIGHT_PX[selectResponsiveType(state, strategy)];

export const selectNavigationTopOffset = (
    state: LayoutStateRoot,
    strategy: ResponsiveStrategy = DEFAULT_RESPONSIVE_STRATEGY,
) => selectIsNavigationVisible(state) ? selectNavigationHeight(state, strategy) : 0;
