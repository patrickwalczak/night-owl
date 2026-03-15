'use client';

import { createPortal } from 'react-dom';
import { useBodyOverflow } from '@/hooks/useBodyOverflow';

export default function Overlay({
	open,
	onClose,
	zIndex = 50,
}: {
	open: boolean;
	onClose: () => void;
	zIndex?: number;
}) {
	useBodyOverflow(open);

	if (!open) return null;

	return createPortal(
		<div className={'backdrop'} style={{ zIndex }} onClick={onClose} aria-hidden="true" />,
		document.body
	);
}
