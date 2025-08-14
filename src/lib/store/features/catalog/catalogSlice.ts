import { CategoryLeaf, SimpleCategoryModelType } from '@/types/category.model';
import { FilterParameterType } from '@/types/parameter.model';
import { createSlice } from '@reduxjs/toolkit';

interface CatalogStateType {
	ui: {
		areFiltersOpen: boolean;
	};
	category: Pick<SimpleCategoryModelType, 'id' | 'name' | 'slug' | 'parentId'>;
	subcategories: CategoryLeaf[];
	parameters: FilterParameterType[];
	productSum: number;
	page: number;
	pageSize: number;
	nextPage: number | null;
}

const initialState: CatalogStateType = {
	ui: {
		areFiltersOpen: false,
	},
	category: {
		id: '',
		name: '',
		slug: '',
		parentId: '',
	},
	subcategories: [],
	parameters: [],
	productSum: 0,
	page: 0,
	pageSize: 0,
	nextPage: null,
};

const catalogSlice = createSlice({
	name: 'catalog',
	initialState,
	reducers: {
		toggleFilters: (state) => {
			state.ui.areFiltersOpen = !state.ui.areFiltersOpen;
		},
		initState: (state, action) => {
			state.ui.areFiltersOpen = action.payload.ui.areFiltersOpen;
			state.category = action.payload.category;
			state.subcategories = action.payload.subcategories;
			state.parameters = action.payload.parameters;
			state.productSum = action.payload.productSum;
			state.page = action.payload.page;
			state.pageSize = action.payload.pageSize;
			state.nextPage = action.payload.nextPage;
		},
	},
});

export const { toggleFilters, initState } = catalogSlice.actions;
export default catalogSlice.reducer;
