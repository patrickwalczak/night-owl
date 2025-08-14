import { configureStore, PreloadedStateShapeFromReducersMapObject, combineReducers } from '@reduxjs/toolkit';
import orderSlice from './features/order/orderSlice';
import catalogSlice from './features/catalog/catalogSlice';

// export type PreloadedStateType = PreloadedStateShapeFromReducersMapObject<typeof rootReducer>;

const rootReducer = combineReducers({
	order: orderSlice,
	catalog: catalogSlice,
});

export const makeStore = () => {
	return configureStore({
		reducer: rootReducer,
	});
};

// export const makeStore = (preloadedState: PreloadedStateType) => {
// 	return configureStore({
// 		reducer: rootReducer,
// 		preloadedState,
// 	});
// };
