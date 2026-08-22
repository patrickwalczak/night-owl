import {
    DEFAULT_RESPONSIVE_STRATEGY,
    type DeviceType,
    type ResponsiveStrategy,
} from '@/shared/model/device.model';

import { type AppState } from './appSlice';

interface AppStateRoot {
    app: AppState;
}

export const selectInitialDeviceType = (state: AppStateRoot) => state.app.initialDeviceType;

export const selectViewportType = (state: AppStateRoot) => state.app.viewportType;

export const selectIsViewportReady = (state: AppStateRoot) => state.app.isViewportReady;

export const selectResponsiveType = (
    state: AppStateRoot,
    strategy: ResponsiveStrategy = DEFAULT_RESPONSIVE_STRATEGY,
): DeviceType => {
    const { initialDeviceType, isViewportReady, viewportType } = state.app;

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
    state: AppStateRoot,
    strategy: ResponsiveStrategy = DEFAULT_RESPONSIVE_STRATEGY,
) => selectResponsiveType(state, strategy) === 'desktop';

export const selectIsMobile = (
    state: AppStateRoot,
    strategy: ResponsiveStrategy = DEFAULT_RESPONSIVE_STRATEGY,
) => selectResponsiveType(state, strategy) === 'mobile';

export const selectIsTablet = (
    state: AppStateRoot,
    strategy: ResponsiveStrategy = DEFAULT_RESPONSIVE_STRATEGY,
) => selectResponsiveType(state, strategy) === 'tablet';

export const selectIsNavigationOpen = (state: AppStateRoot) => state.app.isNavigationOpen;
