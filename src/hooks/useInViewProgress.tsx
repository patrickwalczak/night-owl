'use client';

import { useEffect, useMemo, useRef, useState, useCallback } from 'react';

export type UseInViewProgressOptions = {
	/** Scroll container; omit for viewport */
	root?: Element | null;
	/** Observer margins, e.g. '0px 0px -30% 0px' */
	rootMargin?: string;
	/** Number of thresholds between 0..1 (>=1). More = smoother */
	steps?: number;

	/** When false, hook is disabled: ratio becomes 1 and observer is disconnected */
	enabled?: boolean;

	/** Auto-disconnect when ratio reaches 1 */
	disconnectOnComplete?: boolean;

	/** Called once when ratio first reaches 1 (after rounding) */
	onComplete?: () => void;

	/** Initial ratio before observer runs (default 0) */
	initialRatio?: number;
};

export type UseInViewProgressReturn<T extends Element> = {
	/** Attach to the element you want to observe */
	ref: React.RefObject<T | null>;
	/** Current intersection ratio in [0, 1] */
	ratio: number;
	/** Manually disconnect the observer (safe to call multiple times) */
	disconnect: () => void;
};

function buildThresholds(steps: number): number[] {
	const clamped = Math.max(1, Math.floor(steps));
	const values: number[] = [];
	for (let i = 0; i <= clamped; i += 1) values.push(i / clamped);
	return values;
}

export function useInViewProgress<T extends Element>(
	options: UseInViewProgressOptions = {}
): UseInViewProgressReturn<T> {
	const {
		root = null,
		rootMargin = '0px 0px -30% 0px',
		steps = 24,
		enabled = true,
		disconnectOnComplete = false,
		onComplete,
		initialRatio = 0,
	} = options;

	const targetRef = useRef<T | null>(null);
	const observerRef = useRef<IntersectionObserver | null>(null);
	const animationFrameIdRef = useRef<number | null>(null);
	const latestEntryRef = useRef<IntersectionObserverEntry | null>(null);
	const didCompleteRef = useRef<boolean>(false);

	const [ratio, setRatio] = useState<number>(initialRatio);

	const thresholds = useMemo(() => buildThresholds(steps), [steps]);

	const clearAnimationFrame = useCallback(() => {
		if (animationFrameIdRef.current !== null) {
			cancelAnimationFrame(animationFrameIdRef.current);
			animationFrameIdRef.current = null;
		}
	}, []);

	const disconnect = useCallback(() => {
		clearAnimationFrame();
		if (observerRef.current) {
			observerRef.current.disconnect();
			observerRef.current = null;
		}
	}, [clearAnimationFrame]);

	const applyLatest = useCallback(() => {
		animationFrameIdRef.current = null;

		const entry = latestEntryRef.current;
		if (!entry) return;

		const nextRatio = Math.max(0, Math.min(1, entry.intersectionRatio));
		setRatio(nextRatio);

		const reachedOne = nextRatio >= 1 - 1e-6;

		if (reachedOne && !didCompleteRef.current) {
			didCompleteRef.current = true;
			if (typeof onComplete === 'function') onComplete();
			if (disconnectOnComplete) disconnect();
		}
	}, [disconnectOnComplete, disconnect, onComplete]);

	const connect = useCallback(() => {
		const element = targetRef.current;
		if (!element) return;

		const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (!enabled || prefersReducedMotion) {
			setRatio(1);
			if (!didCompleteRef.current) {
				didCompleteRef.current = true;
				if (typeof onComplete === 'function') onComplete();
			}
			return;
		}

		didCompleteRef.current = false;

		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				latestEntryRef.current = entry;

				if (animationFrameIdRef.current === null) {
					animationFrameIdRef.current = requestAnimationFrame(applyLatest);
				}
			},
			{
				root: root ?? null,
				rootMargin,
				threshold: thresholds,
			}
		);

		observerRef.current = observer;
		observer.observe(element);
	}, [enabled, root, rootMargin, thresholds, applyLatest, onComplete]);

	useEffect(() => {
		connect();
		return () => disconnect();
	}, [connect, disconnect]);

	return { ref: targetRef, ratio, disconnect };
}
