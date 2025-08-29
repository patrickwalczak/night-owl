import { useEffect } from 'react';

export const useBodyOverflow = (isOpened: boolean) => {
	useEffect(() => {
		if (isOpened) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpened]);
};
