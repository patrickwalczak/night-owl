import {
    DEFAULT_RESPONSIVE_STRATEGY,
    type DeviceType,
    type ResponsiveStrategy,
} from '@/shared/model/device.model';

import { type DeviceState } from './deviceSlice';

interface DeviceStateRoot {
    device: DeviceState;
}

export const selectInitialDeviceType = (state: DeviceStateRoot) => state.device.initialDeviceType;

export const selectViewportType = (state: DeviceStateRoot) => state.device.viewportType;

export const selectIsViewportReady = (state: DeviceStateRoot) => state.device.isViewportReady;

export const selectResponsiveType = (
    state: DeviceStateRoot,
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
    state: DeviceStateRoot,
    strategy: ResponsiveStrategy = DEFAULT_RESPONSIVE_STRATEGY,
) => selectResponsiveType(state, strategy) === 'desktop';

export const selectIsMobile = (
    state: DeviceStateRoot,
    strategy: ResponsiveStrategy = DEFAULT_RESPONSIVE_STRATEGY,
) => selectResponsiveType(state, strategy) === 'mobile';

export const selectIsTablet = (
    state: DeviceStateRoot,
    strategy: ResponsiveStrategy = DEFAULT_RESPONSIVE_STRATEGY,
) => selectResponsiveType(state, strategy) === 'tablet';
