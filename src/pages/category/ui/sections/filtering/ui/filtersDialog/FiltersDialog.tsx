'use client';

import { useOpenState } from '@/shared/lib/hooks/client';
import { cn } from '@/shared/lib/utils/cn';
import { FiltersIcon } from '@/shared/ui/icons';

import FiltersModal from './FiltersModal';
import styles from './filtersModal.module.scss';

const FiltersDialog = () => {
    const { isOpen, close, open } = useOpenState();

    return (
        <>
            <button
                onClick={open}
                className={cn(styles.modalButton, 'button-empty', 'flex')}
            >
                {'Filters'}
                <FiltersIcon />
            </button>
            <FiltersModal isOpen={isOpen} close={close} />
        </>
    );
};

export default FiltersDialog;
