'use client';

import { useEffect, useState, useCallback } from 'react';

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
		const onPop = () => sync();
		const onUrlChange = () => sync();

		window.addEventListener('popstate', onPop);
		window.addEventListener('urlchange', onUrlChange);

		return () => {
			window.removeEventListener('popstate', onPop);
			window.removeEventListener('urlchange', onUrlChange);
		};
	}, [sync]);

	/**
	 * Replaces current URL search params without adding a new browser history entry.
	 *
	 * The updater receives a mutable `URLSearchParams` instance based on the current URL.
	 * After applying changes, the hook updates the browser URL with `history.replaceState`
	 * and dispatches a custom `urlchange` event to resync local state.
	 *
	 * @param updater Callback used to modify the next search params object.
	 */
	const replace = useCallback((updater: (next: URLSearchParams) => void) => {
		const url = new URL(window.location.href);
		const next = new URLSearchParams(url.search);

		updater(next);

		url.search = next.toString();
		window.history.replaceState({}, '', url.toString());
		window.dispatchEvent(new Event('urlchange'));
	}, []);

	/**
	 * Pushes new URL search params and adds a new browser history entry.
	 *
	 * The updater receives a mutable `URLSearchParams` instance based on the current URL.
	 * After applying changes, the hook updates the browser URL with `history.pushState`
	 * and dispatches a custom `urlchange` event to resync local state.
	 *
	 * @param updater Callback used to modify the next search params object.
	 */
	const push = useCallback((updater: (next: URLSearchParams) => void) => {
		const url = new URL(window.location.href);
		const next = new URLSearchParams(url.search);

		updater(next);

		url.search = next.toString();
		window.history.pushState({}, '', url.toString());
		window.dispatchEvent(new Event('urlchange'));
	}, []);

	return { searchParams, replace, push };
}
