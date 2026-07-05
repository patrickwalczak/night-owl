'use client';

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toggleNavigation } from './model/appSlice';
import { selectIsDesktop, selectIsNavigationOpen } from './model/selectors';

export const useIsDesktop = () => useSelector(selectIsDesktop);

export const useIsNavigationOpen = () => useSelector(selectIsNavigationOpen);

export const useSetNavigationOpen = () => {
    const dispatch = useDispatch();

    return useCallback(
        (isNavigationOpen: boolean) => {
            dispatch(toggleNavigation({
                isNavigationOpen,
            }));
        },
        [dispatch],
    );
};
