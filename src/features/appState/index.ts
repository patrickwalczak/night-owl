export {
    setViewportType,
    default as deviceReducer,
} from './model/deviceSlice';
export {
    default as navigationReducer,
    toggleNavigation,
} from './model/navigationSlice';
export {
    selectInitialDeviceType,
    selectIsDesktop,
    selectIsMobile,
    selectIsNavigationOpen,
    selectIsTablet,
    selectIsViewportReady,
    selectResponsiveType,
    selectViewportType,
} from './model/selectors';
export type { DeviceState } from './model/deviceSlice';
export type { NavigationState } from './model/navigationSlice';
