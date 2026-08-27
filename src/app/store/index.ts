import { combineReducers, configureStore, type PreloadedStateShapeFromReducersMapObject } from '@reduxjs/toolkit';

import { deviceReducer, navigationReducer } from '@/features/appState';

const reducer = {
    device: deviceReducer,
    navigation: navigationReducer,
};

type PreloadedStateType = PreloadedStateShapeFromReducersMapObject<typeof reducer>;

const rootReducer = combineReducers(reducer);

export const makeStore = (preloadedState: PreloadedStateType) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
