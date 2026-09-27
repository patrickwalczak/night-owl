import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface CategoryUiState {
    areFiltersOpen: boolean;
}

const initialState: CategoryUiState = {
    areFiltersOpen: false,
};

const categoryUiSlice = createSlice({
    name: 'categoryUi',
    initialState,
    reducers: {
        setAreFiltersOpen(state, action: PayloadAction<boolean>) {
            state.areFiltersOpen = action.payload;
        },
        toggleFilters(state) {
            state.areFiltersOpen = !state.areFiltersOpen;
        },
    },
});

export const { setAreFiltersOpen, toggleFilters } = categoryUiSlice.actions;

export default categoryUiSlice.reducer;
