import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type DeviceType, type ViewportType } from '@/shared/model/device.model';

export interface AppState {
    initialDeviceType: DeviceType;
    viewportType: ViewportType;
    isViewportReady: boolean;
    isNavigationOpen: boolean;
}

const initialState: AppState = {
    initialDeviceType: 'desktop',
    viewportType: 'desktop',
    isViewportReady: false,
    isNavigationOpen: false,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setViewportType(state, action: PayloadAction<ViewportType>) {
            state.viewportType = action.payload;
            state.isViewportReady = true;
        },
        toggleNavigation: (state, action) => {
            state.isNavigationOpen = action.payload.isNavigationOpen;
        },
    },
});

export const { setViewportType, toggleNavigation } = appSlice.actions;
export default appSlice.reducer;
