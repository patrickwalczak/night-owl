import { configureStore, type PreloadedStateShapeFromReducersMapObject, combineReducers } from '@reduxjs/toolkit';

import appSlice from './features/app/appSlice';
import orderSlice from './features/order/orderSlice';

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
