export type FlyOptions = {
	duration?: number; // ms
	curvature?: number; // 0..1 – how high the arc apex sits (0.6 default)
	shrinkTo?: number; // final scale factor (0.2 default)
	easing?: string; // cubic-bezier/string for WAAPI
	borderRadius?: string; // override radius (auto-detected by default)
	cloneClass?: string; // optional class for custom styling
};

function getRadius(el: HTMLElement): string {
	const cs = getComputedStyle(el);
	return cs.borderRadius || '12px';
}

export function flyToCart(sourceEl: HTMLElement, targetEl: HTMLElement, opts: FlyOptions = {}) {
	const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
	if (reduce) return;

	const duration = opts.duration ?? 700;
	const curvature = opts.curvature ?? 0.6;
	const shrinkTo = opts.shrinkTo ?? 0.2;
	const easing = opts.easing ?? 'cubic-bezier(.22,.61,.36,1)';

	const s = sourceEl.getBoundingClientRect();
	const t = targetEl.getBoundingClientRect();

	const clone = sourceEl.cloneNode(true) as HTMLElement;
	const radius = opts.borderRadius ?? getRadius(sourceEl);

	Object.assign(clone.style, {
		position: 'fixed',
		top: s.top + 'px',
		left: s.left + 'px',
		width: s.width + 'px',
		height: s.height + 'px',
		margin: '0',
		pointerEvents: 'none',
		zIndex: '9999',
		borderRadius: radius,
		boxShadow: '0 10px 25px rgba(0,0,0,.25)',
		transform: 'translate3d(0,0,0)',
		willChange: 'transform, opacity',
	} as CSSStyleDeclaration);

	if (opts.cloneClass) clone.classList.add(opts.cloneClass);
	document.body.appendChild(clone);

	const dx = t.left + t.width / 2 - (s.left + s.width / 2);
	const dy = t.top + t.height / 2 - (s.top + s.height / 2);

	const kf: Keyframe[] = [
		{ transform: `translate3d(0,0,0) scale(1)`, opacity: 1, offset: 0 },
		{
			transform: `translate3d(${dx * curvature}px, ${dy * curvature}px, 0) scale(${(1 + shrinkTo) / 2})`,
			opacity: 0.9,
			offset: 0.65,
		},
		{ transform: `translate3d(${dx}px, ${dy}px, 0) scale(${shrinkTo})`, opacity: 0, offset: 1 },
	];

	const anim = (clone as any).animate?.(kf, { duration, easing, fill: 'forwards' });

	if (!anim) {
		const start = performance.now();
		const tick = (now: number) => {
			const p = Math.min(1, (now - start) / duration);
			const e = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p; // easeInOutQuad
			const x = dx * e;
			const y = dy * e;
			const sc = 1 - (1 - shrinkTo) * p;
			clone.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${sc})`;
			clone.style.opacity = String(1 - p);
			if (p < 1) requestAnimationFrame(tick);
			else clone.remove();
		};
		requestAnimationFrame(tick);
		return;
	}

	(anim as Animation).onfinish = () => clone.remove();
	(anim as Animation).oncancel = () => clone.remove();
}
