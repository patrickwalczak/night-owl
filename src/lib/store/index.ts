import { configureStore, PreloadedStateShapeFromReducersMapObject, combineReducers } from '@reduxjs/toolkit';
import orderSlice from './features/order/orderSlice';
import appSlice from './features/app/appSlice';

export type PreloadedStateType = PreloadedStateShapeFromReducersMapObject<typeof rootReducer>;

const rootReducer = combineReducers({
	order: orderSlice,
	app: appSlice,
});

export const makeStore = (preloadedState: PreloadedStateType) => {
	return configureStore({
		reducer: rootReducer,
		preloadedState,
	});
};
