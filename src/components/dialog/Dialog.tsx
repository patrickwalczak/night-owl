'use client';

import { useEffect, useRef } from 'react';

type DialogProps = {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
};

const Dialog = ({ open, onClose, children }: DialogProps) => {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		if (open) {
			if (!dialog.open) dialog.showModal();
		} else {
			if (dialog.open) dialog.close();
		}

		const handleCancel = (e: Event) => {
			e.preventDefault();
			onClose();
		};

		dialog.addEventListener('cancel', handleCancel); // handles ESC
		return () => dialog.removeEventListener('cancel', handleCancel);
	}, [open, onClose]);

	return (
		<dialog
			ref={dialogRef}
			className="dialog"
			onClick={(e) => {
				// close if backdrop is clicked
				const dialog = dialogRef.current;
				if (e.target === dialog) onClose();
			}}
		>
			<button className="dialog-close" onClick={onClose} aria-label="Close dialog">
				✕
			</button>
			{children}
		</dialog>
	);
};

export default Dialog;
