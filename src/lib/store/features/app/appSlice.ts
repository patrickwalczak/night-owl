import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export interface AppState {
	device: DeviceType;
	isMobile: boolean;
	isTablet: boolean;
	isDesktop: boolean;
	isNavigationOpen: boolean;
}

const initialState: AppState = {
	device: 'desktop',
	isMobile: false,
	isTablet: false,
	isDesktop: true,
	isNavigationOpen: false,
};

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setDevice(state, action: PayloadAction<DeviceType>) {
			state.device = action.payload;
			state.isDesktop = action.payload === 'desktop';
			state.isTablet = action.payload === 'tablet';
			state.isMobile = action.payload === 'mobile';
		},
		toggleNavigation: (state, action) => {
			state.isNavigationOpen = action.payload.isNavigationOpen;
		},
	},
});

export const { setDevice, toggleNavigation } = appSlice.actions;
export default appSlice.reducer;
