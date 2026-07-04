export {
    default as appReducer,
    setDevice,
    toggleNavigation,
} from './model/appSlice';
export { selectIsDesktop, selectIsNavigationOpen } from './model/selectors';
export type { AppState } from './model/appSlice';
