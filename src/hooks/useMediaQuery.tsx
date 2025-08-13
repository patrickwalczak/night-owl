'use client';

import { useEffect, useState } from 'react';

export default function useMediaQuery(query: string) {
	const [match, setMatch] = useState<boolean | null>(null);

	useEffect(() => {
		const mq = window.matchMedia(query);
		const onChange = () => setMatch(mq.matches);
		onChange();
		mq.addEventListener?.('change', onChange);
		return () => mq.removeEventListener?.('change', onChange);
	}, [query]);

	return match;
}
