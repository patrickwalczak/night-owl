'use client';

import type React from 'react';

import { createContext, useCallback, useMemo } from 'react';

import { DEFAULT_SORT_ORDER, SEARCH_PARAMS_KEYS } from '@/pages/categorySlug/config/searchParams';
import { getIdsFromSearchParams } from '@/pages/categorySlug/lib/url';
import { type SearchParamsKeys } from '@/pages/categorySlug/model/searchParams.types';
import { useShallowSearchParams } from '@/shared/lib/hooks/useShallowSearchParams';

interface ApplyArgs {
    sort?: string | null;
    ids?: string[];
    query?: string | null;
}

interface CatalogUrlActionsContextType {
    /**
	 * Replaces current URL search params without adding a new browser history entry.
	 */
    replace: (updater: (sp: URLSearchParams) => void) => void;

    /**
	 * Pushes new URL search params and adds a new browser history entry.
	 */
    push: (updater: (sp: URLSearchParams) => void) => void;

    /**
	 * Sets the `sort` search param.
	 * Removes `page` from the URL.
	 * Removes `sort` when value is empty or equals the default sort order.
	 */
    setSort: (sort: string | null) => void;

    /**
	 * Sets the `params` search param as a comma-separated list of ids.
	 * Removes `page` from the URL.
	 * Removes `params` when the provided list is empty.
	 */
    setFilters: (ids: string[]) => void;

    /**
	 * Adds a single id to the `params` search param.
	 * Removes `page` from the URL.
	 * Does not duplicate existing ids.
	 */
    addParam: (id: string) => void;

    /**
	 * Removes a single id from the `params` search param.
	 * Removes `page` from the URL.
	 * Removes `params` completely when no ids remain.
	 */
    removeParam: (id: string) => void;

    /**
	 * Sets the `query` search param.
	 * Removes `page` from the URL.
	 * Removes `query` when value is empty.
	 */
    setQuery: (q: string | null) => void;

    /**
	 * Resets selected catalog search params.
	 * You can keep chosen params by passing them in `ignoredSearchParamsKeys`.
	 */
    reset: (ignoredSearchParamsKeys?: SearchParamsKeys[]) => void;

    /**
	 * Applies multiple filter-related search params at once.
	 * Supports updating `sort`, `params`, and `query` in one operation.
	 * Removes `page` from the URL.
	 */
    applyFilters: (args: ApplyArgs) => void;

    /**
	 * Current URL search params.
	 */
    searchParams: URLSearchParams;
}

export const CatalogUrlActionsContext = createContext<CatalogUrlActionsContextType | null>(null);

export function CatalogUrlActionsProvider({ children }: { children: React.ReactNode }) {
    const { searchParams, replace, push } = useShallowSearchParams();

    const setSort = useCallback(
        (sort: string | null) => {
            replace((sp) => {
                sp.delete('page');
                if (!sort || sort === DEFAULT_SORT_ORDER) sp.delete('sort');
                else sp.set('sort', sort);
            });
        },
        [replace],
    );

    const setFilters = useCallback(
        (ids: string[]) => {
            replace((sp) => {
                sp.delete('page');
                if (ids.length) sp.set('filters', ids.join(','));
                else sp.delete('filters');
            });
        },
        [replace],
    );

    const addParam = useCallback(
        (id: string) => {
            replace((searchParams) => {
                searchParams.delete('page');
                const list = getIdsFromSearchParams(searchParams);

                if (!list.includes(id)) list.push(id);
                if (list.length) searchParams.set('filters', list.join(','));
                else searchParams.delete('filters');
            });
        },
        [replace],
    );

    const removeParam = useCallback(
        (id: string) => {
            replace((searchParams) => {
                searchParams.delete('page');
                const list = getIdsFromSearchParams(searchParams).filter(x => x !== id);

                if (list.length) searchParams.set('filters', list.join(','));
                else searchParams.delete('filters');
            });
        },
        [replace],
    );

    const setQuery = useCallback(
        (query: string | null) => {
            replace((searchParams) => {
                searchParams.delete('page');
                const clean = (query ?? '').trim();
                if (clean) searchParams.set('query', clean);
                else searchParams.delete('query');
            });
        },
        [replace],
    );

    const reset = useCallback(
        (ignoredSearchParamsKeys: SearchParamsKeys[] = []) => {
            replace((sp) => {
                Object.values(SEARCH_PARAMS_KEYS)
                    .filter(k => !ignoredSearchParamsKeys.includes(k))
                    .forEach(k => sp.delete(k));
            });
        },
        [replace],
    );

    const applyFilters = useCallback(
        ({ sort = null, ids, query = null }: ApplyArgs) => {
            replace((sp) => {
                sp.delete('page');
                if (!sort || sort === DEFAULT_SORT_ORDER) sp.delete('sort');
                else sp.set('sort', sort);

                if (ids && ids.length) sp.set('filters', ids.join(','));
                else if (ids) sp.delete('filters');

                const clean = (query ?? '').trim();
                if (clean) sp.set('query', clean);
                else sp.delete('query');
            });
        },
        [replace],
    );

    const value = useMemo<CatalogUrlActionsContextType>(
        () => ({
            replace,
            push,
            setSort,
            setFilters,
            addParam,
            removeParam,
            setQuery,
            reset,
            searchParams,
            applyFilters,
        }),
        [replace, push, setSort, setFilters, addParam, removeParam, setQuery, reset, searchParams, applyFilters],
    );

    return <CatalogUrlActionsContext.Provider value={value}>{children}</CatalogUrlActionsContext.Provider>;
}
