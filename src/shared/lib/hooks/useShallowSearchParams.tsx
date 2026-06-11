'use client';

import { useCallback, useEffect, useState } from 'react';

type SearchParamsUpdaterType = (next: URLSearchParams) => void;
type HistoryModeType = 'replace' | 'push';

/**
 * Provides a shallow API for reading and updating URL search params on the client.
 *
 * The hook keeps `searchParams` in sync with the current browser URL and exposes
 * two helpers for updating search params without triggering a full page reload:
 * `replace` and `push`.
 *
 * It also listens to:
 * - `popstate` to react to browser back/forward navigation
 * - custom `urlchange` events dispatched after internal URL updates
 *
 * @returns An object containing current search params and helper methods for updating them.
 */
export function useShallowSearchParams() {
	const [searchParams, setSearchParams] = useState(
		() => new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '')
	);

	/**
	 * Synchronizes local state with the current browser URL search string.
	 */
	const sync = useCallback(() => {
		setSearchParams(new URLSearchParams(window.location.search));
	}, []);

	useEffect(() => {
		const onUrlChange = () => sync();

		window.addEventListener('popstate', onUrlChange);
		window.addEventListener('urlchange', onUrlChange);

		return () => {
			window.removeEventListener('popstate', onUrlChange);
			window.removeEventListener('urlchange', onUrlChange);
		};
	}, [sync]);

	/**
	 * Updates current URL search params using the selected History API method.
	 *
	 * @param updater - Callback used to modify the next search params object.
	 * @param mode - Determines whether the URL should replace the current history entry or push a new one.
	 */
	const updateSearchParams = useCallback((updater: SearchParamsUpdaterType, mode: HistoryModeType) => {
		const url = new URL(window.location.href);
		const next = new URLSearchParams(url.search);

		updater(next);

		url.search = next.toString();

		if (mode === 'replace') window.history.replaceState({}, '', url.toString());
		else window.history.pushState({}, '', url.toString());

		window.dispatchEvent(new Event('urlchange'));
	}, []);

	/**
	 * Replaces current URL search params without adding a new browser history entry.
	 *
	 * @param updater - Callback used to modify the next search params object.
	 */
	const replace = useCallback(
		(updater: SearchParamsUpdaterType) => {
			updateSearchParams(updater, 'replace');
		},
		[updateSearchParams]
	);

	/**
	 * Pushes new URL search params and adds a new browser history entry.
	 *
	 * @param updater - Callback used to modify the next search params object.
	 */
	const push = useCallback(
		(updater: SearchParamsUpdaterType) => {
			updateSearchParams(updater, 'push');
		},
		[updateSearchParams]
	);

	return { searchParams, replace, push };
}
