import { configureStore, PreloadedStateShapeFromReducersMapObject, combineReducers } from '@reduxjs/toolkit';
import orderSlice from './features/order/orderSlice';

// export type PreloadedStateType = PreloadedStateShapeFromReducersMapObject<typeof rootReducer>;

// const rootReducer = combineReducers({});

export const makeStore = () => {
	return configureStore({
		reducer: {
			cart: orderSlice,
		},
	});
};

// export const makeStore = (preloadedState: PreloadedStateType) => {
// 	return configureStore({
// 		reducer: rootReducer,
// 		preloadedState,
// 	});
// };
