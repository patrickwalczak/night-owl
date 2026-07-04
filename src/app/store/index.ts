import { configureStore, type PreloadedStateShapeFromReducersMapObject, combineReducers } from '@reduxjs/toolkit';

import appSlice from '../../features/appState/model/appSlice';

type PreloadedStateType = PreloadedStateShapeFromReducersMapObject<typeof rootReducer>;

const rootReducer = combineReducers({
    app: appSlice,
});

export const makeStore = (preloadedState: PreloadedStateType) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
