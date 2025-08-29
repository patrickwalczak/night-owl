'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './styles.module.scss';

export default function Overlay({
	open,
	onClose,
	zIndex = 50,
}: {
	open: boolean;
	onClose: () => void;
	zIndex?: number;
}) {
	useEffect(() => {
		if (!open) return;

		const body = document.body;
		const prevOverflow = body.style.overflow;
		const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();

		body.style.overflow = 'hidden';
		document.addEventListener('keydown', onKey);

		return () => {
			body.style.overflow = prevOverflow;
			document.removeEventListener('keydown', onKey);
		};
	}, [open, onClose]);

	if (!open) return null;

	return createPortal(
		<div className={styles.backdrop} style={{ zIndex }} onClick={onClose} aria-hidden="true" />,
		document.body
	);
}
