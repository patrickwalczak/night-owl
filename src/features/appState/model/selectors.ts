import { type AppState } from './appSlice';

interface AppStateRoot {
    app: AppState;
}

export const selectIsDesktop = (state: AppStateRoot) => state.app.isDesktop;

export const selectIsNavigationOpen = (state: AppStateRoot) => state.app.isNavigationOpen;
