import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { navigationReducer } from '@/features/layout';

const reducer = {
    navigation: navigationReducer,
};

const rootReducer = combineReducers(reducer);

export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
