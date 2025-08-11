import { useEffect, useRef, useState } from 'react';

type ScrollDirection = 'up' | 'down';

const useScrollState = (offset = 60, threshold = 8) => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [direction, setDirection] = useState<ScrollDirection>('up');

	const lastY = useRef(0);
	const ticking = useRef(false);

	useEffect(() => {
		const onScroll = () => {
			const y = Math.max(0, window.scrollY);

			if (!ticking.current) {
				window.requestAnimationFrame(() => {
					setIsScrolled(y >= offset);

					const diff = y - lastY.current;
					if (Math.abs(diff) >= threshold) {
						setDirection(diff > 0 ? 'down' : 'up');
						lastY.current = y;
					}

					ticking.current = false;
				});
				ticking.current = true;
			}
		};

		lastY.current = Math.max(0, window.scrollY);
		onScroll();

		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, [offset, threshold]);

	return { isScrolled, direction };
};

export default useScrollState;
