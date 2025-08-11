import React from 'react';
import { mergeClasses } from '@/utils/mergeClasses';
import styles from './parametersModal.module.scss';
import Modal from '@/components/modal/Modal';

const ParametersModal = ({ isOpened, close }: { isOpened: boolean; close: () => void }) => {
	return (
		<Modal open={isOpened} onClose={close}>
			<Modal.Overlay>
				<Modal.Wrapper
					id="mobile-menu"
					className={mergeClasses(styles.modal)}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0, scale: 0.9 }}
					transition={{ duration: 0.4 }}
				>
					<Modal.Header className={mergeClasses(styles.header, 'flex', 'align-center', 'justify-between')}>
						<h3 className={styles.heading}>Filters</h3>
						<Modal.CloseButton className={styles.closeModalBtn} />
					</Modal.Header>
				</Modal.Wrapper>
			</Modal.Overlay>
		</Modal>
	);
};

export default ParametersModal;
