import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type DeviceType, type ViewportType } from '@/shared/model/device.model';

export interface DeviceState {
    initialDeviceType: DeviceType;
    viewportType: ViewportType;
    isViewportReady: boolean;
}

const initialState: DeviceState = {
    initialDeviceType: 'desktop',
    viewportType: 'desktop',
    isViewportReady: false,
};

const deviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
        setViewportType(state, action: PayloadAction<ViewportType>) {
            state.viewportType = action.payload;
            state.isViewportReady = true;
        },
    },
});

export const { setViewportType } = deviceSlice.actions;
export default deviceSlice.reducer;
