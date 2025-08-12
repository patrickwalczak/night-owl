import React, { useState } from 'react';
import { mergeClasses } from '@/utils/mergeClasses';
import styles from './filtersModal.module.scss';
import Modal from '@/components/modal/Modal';
import { usePathname, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { SortOrderKeys } from '@/types/catalog.models';
import SortOrderSelector from '../sortOrderSelector/SortOrderSelector';
import { FilterParameterType } from '@/types/parameter.model';
import FilterActions from '../filterActions/FilterActions';
import { DEFAULT_SORT_ORDER } from '@/constants';
import ParameterGroup from '../../parameterGroup/ParameterGroup';

const FiltersModal = ({ isOpened, close }: { isOpened: boolean; close: () => void }) => {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const initialSort = searchParams.get('sort') || DEFAULT_SORT_ORDER;
	const initialParamIds = (searchParams.get('params') ?? '').split(',').filter(Boolean);

	const [sort, setSort] = useState<SortOrderKeys>(initialSort as SortOrderKeys);
	const [selectedParamIds, setSelectedParamIds] = useState<string[]>(initialParamIds);

	const { data } = useQuery({
		queryKey: ['category-parameters', pathname],
		queryFn: async () => {
			const res = await fetch(`/api${pathname}/parameters`, { cache: 'no-store' });
			if (!res.ok) throw new Error('Failed to load parameters');
			return res.json() as Promise<{ parameters: FilterParameterType[] }>;
		},
	});

	return (
		<Modal open={isOpened} onClose={close}>
			<Modal.Overlay>
				<Modal.Wrapper
					id="filters-modal"
					className={mergeClasses(styles.modal)}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0, scale: 0.9 }}
					transition={{ duration: 0.3 }}
				>
					<Modal.Header className={mergeClasses(styles.header, 'flex', 'align-center', 'justify-between')}>
						<h3 className={styles.heading}>Filters</h3>
						<Modal.CloseButton className={styles.closeModalBtn} />
					</Modal.Header>

					<div className={mergeClasses(styles.body, 'flex', 'flex-col')}>
						<SortOrderSelector sort={sort} setSort={setSort} />
						{data?.parameters.map((param) => (
							<ParameterGroup
								key={param.id}
								parameter={param}
								selectedParamIds={selectedParamIds}
								setSelectedParamIds={setSelectedParamIds}
							/>
						))}
					</div>
					<FilterActions close={close} sort={sort} selectedParamIds={selectedParamIds} />
				</Modal.Wrapper>
			</Modal.Overlay>
		</Modal>
	);
};

export default FiltersModal;
