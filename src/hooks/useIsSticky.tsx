'use client';
import { useEffect, useRef, useState } from 'react';

export function useIsSticky(top: number) {
	const sentinelRef = useRef<HTMLDivElement | null>(null);
	const [isStuck, setIsStuck] = useState(false);

	useEffect(() => {
		const node = sentinelRef.current;
		if (!node) return;

		const obs = new IntersectionObserver(([entry]) => setIsStuck(!entry.isIntersecting), {
			root: null,
			rootMargin: `-${top}px 0px 0px 0px`,
			threshold: 0,
		});

		obs.observe(node);
		return () => obs.disconnect();
	}, [top]);

	return { isStuck, sentinelRef };
}
