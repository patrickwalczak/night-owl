'use client';

import { createContext } from 'react';
import {
    createDispatchHook,
    createSelectorHook,
    createStoreHook,
    type ReactReduxContextValue,
} from 'react-redux';

import type { CategoryPageDispatch, CategoryPageRootState, CategoryPageStore } from './store';

export const CategoryPageStoreContext
    = createContext<ReactReduxContextValue<CategoryPageRootState> | null>(null);

export const useCategoryPageDispatch
    = createDispatchHook(CategoryPageStoreContext).withTypes<CategoryPageDispatch>();

export const useCategoryPageSelector
    = createSelectorHook(CategoryPageStoreContext).withTypes<CategoryPageRootState>();

export const useCategoryPageStore
    = createStoreHook(CategoryPageStoreContext).withTypes<CategoryPageStore>();
