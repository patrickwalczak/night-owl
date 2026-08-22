export const DEVICE_TYPES = ['desktop', 'tablet', 'mobile'] as const;

export type DeviceType = (typeof DEVICE_TYPES)[number];

export type ViewportType = DeviceType;

export type ResponsiveStrategy
    = | 'mobile-protective'
        | 'ssr'
        | 'ssr-until-viewport-ready'
        | 'viewport';

export const DEFAULT_RESPONSIVE_STRATEGY: ResponsiveStrategy = 'ssr-until-viewport-ready';

export const isDeviceType = (value: string | null): value is DeviceType => {
    return DEVICE_TYPES.includes(value as DeviceType);
};
