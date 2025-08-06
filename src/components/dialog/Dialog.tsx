'use client';

import { use, useEffect } from 'react';
import styles from './dialog.module.scss';
import { createPortal } from 'react-dom';
import Close from '../icons/Close';
import { useBodyOverflow } from './useBodyOverflow';
import { useHandleEscape } from './useHandleEscape';

type DialogProps = {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
};

const Dialog = ({ open, onClose, children }: DialogProps) => {
	useBodyOverflow(open);
	useHandleEscape(open, onClose);

	if (!open) return null;

	return createPortal(
		<div className={styles.overlay} onClick={onClose}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()} role="dialog">
				<button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
					<Close />
				</button>
				{children}
			</div>
		</div>,
		document.body
	);
};

export default Dialog;
