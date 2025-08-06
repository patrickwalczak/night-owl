import { useEffect } from 'react';

export const useHandleEscape = (open: boolean, onClose: () => void) => {
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		if (open) {
			window.addEventListener('keydown', handleKeyDown);
		}
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [open]);
};
