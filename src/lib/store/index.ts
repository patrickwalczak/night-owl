import { configureStore, PreloadedStateShapeFromReducersMapObject, combineReducers } from '@reduxjs/toolkit';

export type PreloadedStateType = PreloadedStateShapeFromReducersMapObject<typeof rootReducer>;

const rootReducer = combineReducers({});

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
