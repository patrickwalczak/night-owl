'use client';

import { useEffect, useRef } from 'react';

export const useOutsideClick = (callback: () => void, isEnabled = true) => {
	const ref = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent | TouchEvent) => {
			if (ref.current && !(ref.current as HTMLElement).contains(event.target as Node)) {
				callback();
			}
		};

		if (isEnabled) {
			document.addEventListener('mouseup', handleClickOutside);
			document.addEventListener('touchend', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mouseup', handleClickOutside);
			document.removeEventListener('touchend', handleClickOutside);
		};
	}, [callback, isEnabled]);

	return ref;
};
