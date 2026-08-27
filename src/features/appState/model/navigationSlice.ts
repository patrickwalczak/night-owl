import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface NavigationState {
    isNavigationOpen: boolean;
}

interface ToggleNavigationPayload {
    isNavigationOpen: boolean;
}

const initialState: NavigationState = {
    isNavigationOpen: false,
};

const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        toggleNavigation(state, action: PayloadAction<ToggleNavigationPayload>) {
            state.isNavigationOpen = action.payload.isNavigationOpen;
        },
    },
});

export const { toggleNavigation } = navigationSlice.actions;
export default navigationSlice.reducer;
