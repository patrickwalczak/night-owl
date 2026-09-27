import { useCategoryPageSelector } from '@/pages/category/model/client';
import { ParameterBox } from '@/pages/category/ui/components/parameterBox/ParameterBox';
import { cn } from '@/shared/lib/utils';
import Modal from '@/shared/ui/modal/client';

import styles from './filtersModal.module.scss';

const FiltersModal = ({ isOpen, close }: { isOpen: boolean; close: () => void }) => {
    const parameters = useCategoryPageSelector(state => state.categoryListing.parameters);

    return (
        <Modal open={isOpen} onClose={close}>
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
                        {parameters.map(parameter => (
                            <ParameterBox key={parameter.id} parameter={parameter} />
                        ))}
                    </div>
                </Modal.Wrapper>
            </Modal.Overlay>
        </Modal>
    );
};

export default FiltersModal;
