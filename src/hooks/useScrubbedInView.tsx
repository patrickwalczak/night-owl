// useScrubbedInView.ts
'use client';

import { useEffect, useMemo } from 'react';
import { useInViewProgress, UseInViewProgressOptions } from './useInViewProgress';

type AutoDisconnect = 'never' | 'threshold' | 'complete';

export type UseScrubbedInViewOptions = {
	io?: UseInViewProgressOptions;
	ease?: (t: number) => number;
	threshold?: number;
	autoDisconnect?: AutoDisconnect;
	mapTo?: { min: number; max: number };
};

export function useScrubbedInView<T extends Element>(opts: UseScrubbedInViewOptions = {}) {
	const { io, ease = (t: number) => 1 - Math.pow(1 - t, 3), threshold = 0.9, autoDisconnect = 'never', mapTo } = opts;

	const { ref, ratio, disconnect } = useInViewProgress<T>({
		...io,
	});

	const progress = useMemo(() => {
		const clamped = Math.min(1, Math.max(0, ratio));
		return ease(clamped);
	}, [ratio, ease]);

	const isOn = progress >= threshold;

	const mapped = useMemo(() => {
		if (!mapTo) return undefined as number | undefined;
		const { min, max } = mapTo;
		return min + (max - min) * progress;
	}, [mapTo, progress]);

	useEffect(() => {
		if (autoDisconnect === 'threshold' && isOn) disconnect();
	}, [autoDisconnect, isOn, disconnect]);

	useEffect(() => {
		if (autoDisconnect === 'complete' && ratio >= 1 - 1e-6) disconnect();
	}, [autoDisconnect, ratio, disconnect]);

	return { ref, ratio, progress, isOn, mapped, disconnect };
}
