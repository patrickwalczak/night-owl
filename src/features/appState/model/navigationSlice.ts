import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface NavigationState {
    isNavigationVisible: boolean;
}

interface SetNavigationVisibilityPayload {
    isNavigationVisible: boolean;
}

const initialState: NavigationState = {
    isNavigationVisible: true,
};

const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        setNavigationVisibility(state, action: PayloadAction<SetNavigationVisibilityPayload>) {
            state.isNavigationVisible = action.payload.isNavigationVisible;
        },
    },
});

export const { setNavigationVisibility } = navigationSlice.actions;
export default navigationSlice.reducer;
