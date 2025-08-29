'use client';
import { useEffect, useState, useCallback } from 'react';

export function useShallowSearchParams() {
	const [searchParams, setSearchParams] = useState(
		() => new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '')
	);

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

	const replace = useCallback((updater: (next: URLSearchParams) => void) => {
		const url = new URL(window.location.href);
		const next = new URLSearchParams(url.search);
		updater(next);
		url.search = next.toString();
		window.history.replaceState({}, '', url.toString());
		window.dispatchEvent(new Event('urlchange'));
	}, []);

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
