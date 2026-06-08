import { configureStore, type PreloadedStateShapeFromReducersMapObject, combineReducers } from '@reduxjs/toolkit';

import appSlice from '../../features/appState/model/appSlice';
import orderSlice from '../../features/orderState/model/orderSlice';

type PreloadedStateType = PreloadedStateShapeFromReducersMapObject<typeof rootReducer>;

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
