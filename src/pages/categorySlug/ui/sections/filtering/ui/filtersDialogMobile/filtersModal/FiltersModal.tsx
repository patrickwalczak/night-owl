import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { DEFAULT_SORT_ORDER } from '@/pages/categorySlug/config/searchParams';
import { type SortOrderType } from '@/pages/categorySlug/model/searchParams.types';
import { useSafeContext } from '@/shared/lib/hooks/useSafeContext';
import { cn } from '@/shared/lib/utils/cn';
import Modal from '@/shared/ui/modal/Modal';

import { CatalogContext } from '../../../../../../model/providers/CatalogProvider';
import SortOrderSelector from '../../../../sorting/ui/sortOrderSelector/SortOrderSelector';
import ParameterGroup from '../../parameterGroup/ParameterGroup';
import FilterActions from '../filterActions/FilterActions';
import styles from './filtersModal.module.scss';

const FiltersModal = ({ isOpened, close }: { isOpened: boolean; close: () => void }) => {
    const { parameters } = useSafeContext(CatalogContext);

    const searchParams = useSearchParams();

    const initialSort = searchParams?.get('sort') || DEFAULT_SORT_ORDER;
    const initialParamIds = (searchParams?.get('filters') ?? '').split(',').filter(Boolean);

    const [sort, setSort] = useState<SortOrderType>(initialSort as SortOrderType);
    const [selectedParamIds, setSelectedParamIds] = useState<string[]>(initialParamIds);

    const reset = () => {
        close();
        setSort(DEFAULT_SORT_ORDER);
        setSelectedParamIds([]);
    };

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
                        <SortOrderSelector sort={sort} setSort={setSort} />
                        {parameters.map(param => (
                            <ParameterGroup
                                key={param.id}
                                parameter={param}
                                selectedParamIds={selectedParamIds}
                                setSelectedFilters={setSelectedParamIds}
                            />
                        ))}
                    </div>
                    <FilterActions.Root sort={sort} selectedParamIds={selectedParamIds}>
                        <FilterActions.Apply onClick={close} />
                        <FilterActions.Reset onClick={reset} />
                    </FilterActions.Root>
                </Modal.Wrapper>
            </Modal.Overlay>
        </Modal>
    );
};

export default FiltersModal;
