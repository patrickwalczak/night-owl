import {
    DEFAULT_RESPONSIVE_STRATEGY,
    type DeviceType,
    type ResponsiveStrategy,
} from '@/shared/model/device.model';

import { type DeviceState } from './deviceSlice';
import { type NavigationState } from './navigationSlice';

interface GlobalStateRoot {
    device: DeviceState;
    navigation: NavigationState;
}

export const selectInitialDeviceType = (state: GlobalStateRoot) => state.device.initialDeviceType;

export const selectViewportType = (state: GlobalStateRoot) => state.device.viewportType;

export const selectIsViewportReady = (state: GlobalStateRoot) => state.device.isViewportReady;

export const selectResponsiveType = (
    state: GlobalStateRoot,
    strategy: ResponsiveStrategy = DEFAULT_RESPONSIVE_STRATEGY,
): DeviceType => {
    const { initialDeviceType, isViewportReady, viewportType } = state.device;

    if (strategy === 'ssr') {
        return initialDeviceType;
    }

    if (strategy === 'viewport') {
        return viewportType;
    }

    if (strategy === 'mobile-protective') {
        if (initialDeviceType === 'mobile' || viewportType === 'mobile') {
            return 'mobile';
        }

        return isViewportReady ? viewportType : initialDeviceType;
    }

    return isViewportReady ? viewportType : initialDeviceType;
};

export const selectIsDesktop = (
    state: GlobalStateRoot,
    strategy: ResponsiveStrategy = DEFAULT_RESPONSIVE_STRATEGY,
) => selectResponsiveType(state, strategy) === 'desktop';

export const selectIsMobile = (
    state: GlobalStateRoot,
    strategy: ResponsiveStrategy = DEFAULT_RESPONSIVE_STRATEGY,
) => selectResponsiveType(state, strategy) === 'mobile';

export const selectIsTablet = (
    state: GlobalStateRoot,
    strategy: ResponsiveStrategy = DEFAULT_RESPONSIVE_STRATEGY,
) => selectResponsiveType(state, strategy) === 'tablet';

export const selectIsNavigationOpen = (state: GlobalStateRoot) => state.navigation.isNavigationOpen;
