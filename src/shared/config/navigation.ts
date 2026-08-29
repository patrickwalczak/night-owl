import { type DeviceType } from '@/shared/model/device.model';

export const NAVIGATION_HEIGHT_PX = {
    desktop: 57,
    tablet: 65,
    mobile: 65,
} as const satisfies Record<DeviceType, number>;
