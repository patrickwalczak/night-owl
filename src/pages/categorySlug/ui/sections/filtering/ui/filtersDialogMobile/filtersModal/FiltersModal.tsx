import { cn } from '@/shared/lib/utils/cn';
import Modal from '@/shared/ui/modal/Modal';

import styles from './filtersModal.module.scss';

const FiltersModal = ({ isOpened, close }: { isOpened: boolean; close: () => void }) => {
    return (
        <Modal open={isOpened} onClose={close}>
            <Modal.Overlay>
                <Modal.Wrapper
                    id={'filters-modal'}
                    className={cn(styles.modal)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                >
                    <Modal.Header className={cn(styles.header, 'flex', 'align-center', 'justify-between')}>
                        <h3 className={cn(styles.heading, 'h4')}>{'Filters'}</h3>
                        <Modal.CloseButton className={styles.closeModalBtn} />
                    </Modal.Header>

                    <div className={cn(styles.body, 'flex', 'flex-col')}>
                    </div>
                </Modal.Wrapper>
            </Modal.Overlay>
        </Modal>
    );
};

export default FiltersModal;
