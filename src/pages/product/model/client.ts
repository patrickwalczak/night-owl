'use client';

import { createContext } from 'react';
import {
    createDispatchHook,
    createSelectorHook,
    createStoreHook,
    type ReactReduxContextValue,
} from 'react-redux';

import type { ProductDispatch, ProductRootState, ProductStore } from './store';

export const ProductStoreContext
    = createContext<ReactReduxContextValue<ProductRootState> | null>(null);

export const useProductDispatch
    = createDispatchHook(ProductStoreContext).withTypes<ProductDispatch>();

export const useProductSelector
    = createSelectorHook(ProductStoreContext).withTypes<ProductRootState>();

export const useProductStore
    = createStoreHook(ProductStoreContext).withTypes<ProductStore>();
