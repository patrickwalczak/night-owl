export {
    default as appReducer,
    setViewportType,
    toggleNavigation,
} from './model/appSlice';
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
export type { AppState } from './model/appSlice';
