'use client';

import React, { createContext, useCallback, useMemo } from 'react';
import { DEFAULT_SORT_ORDER, SEARCH_PARAMS_KEYS } from '@/constants';
import { useShallowSearchParams } from '@/hooks/useShallowSearchParams';
import { SearchParamsTypeKeys } from '@/types/catalog.models';

type ApplyArgs = { sort?: string | null; ids?: string[]; query?: string | null };

type CatalogUrlActionsContextType = {
	replace: (updater: (sp: URLSearchParams) => void) => void;
	push: (updater: (sp: URLSearchParams) => void) => void;

	setSort: (sort: string | null) => void; // updates ?sort= and resets ?page=
	setParams: (ids: string[]) => void; // sets comma-joined ?params=
	addParam: (id: string) => void; // adds one id to ?params=
	removeParam: (id: string) => void; // removes one id from ?params=
	setQuery: (q: string | null) => void; // sets ?q= and resets ?page=
	reset: (ignoredSearchParamsKeys?: SearchParamsTypeKeys[]) => void; // clears sort/params/query/page
	applyFilters: (args: ApplyArgs) => void;
	searchParams: URLSearchParams;
};

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
		[replace]
	);

	const setParams = useCallback(
		(ids: string[]) => {
			replace((sp) => {
				sp.delete('page');
				if (ids.length) sp.set('params', ids.join(','));
				else sp.delete('params');
			});
		},
		[replace]
	);

	const addParam = useCallback(
		(id: string) => {
			replace((searchParams) => {
				searchParams.delete('page');
				const list = (searchParams.get('params') || '')
					.split(',')
					.map((searchParam) => searchParam.trim())
					.filter(Boolean);
				if (!list.includes(id)) list.push(id);
				if (list.length) searchParams.set('params', list.join(','));
				else searchParams.delete('params');
			});
		},
		[replace]
	);

	const removeParam = useCallback(
		(id: string) => {
			replace((searchParams) => {
				searchParams.delete('page');
				const list = (searchParams.get('params') || '')
					.split(',')
					.map((searchParam) => searchParam.trim())
					.filter(Boolean)
					.filter((x) => x !== id);
				if (list.length) searchParams.set('params', list.join(','));
				else searchParams.delete('params');
			});
		},
		[replace]
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
		[replace]
	);

	const reset = useCallback(
		(ignoredSearchParamsKeys: SearchParamsTypeKeys[] = []) => {
			replace((sp) => {
				SEARCH_PARAMS_KEYS.filter((k) => !ignoredSearchParamsKeys.includes(k)).forEach((k) => sp.delete(k));
			});
		},
		[replace]
	);

	const applyFilters = useCallback(
		({ sort = null, ids, query = null }: ApplyArgs) => {
			replace((sp) => {
				sp.delete('page');
				if (!sort || sort === DEFAULT_SORT_ORDER) sp.delete('sort');
				else sp.set('sort', sort);
				if (ids && ids.length) sp.set('params', ids.join(','));
				else if (ids) sp.delete('params');
				const clean = (query ?? '').trim();
				if (clean) sp.set('query', clean);
				else sp.delete('query');
			});
		},
		[replace]
	);

	const value = useMemo<CatalogUrlActionsContextType>(
		() => ({
			replace,
			push,
			setSort,
			setParams,
			addParam,
			removeParam,
			setQuery,
			reset,
			searchParams,
			applyFilters,
		}),
		[replace, push, setSort, setParams, addParam, removeParam, setQuery, reset, searchParams, applyFilters]
	);

	return <CatalogUrlActionsContext.Provider value={value}>{children}</CatalogUrlActionsContext.Provider>;
}
