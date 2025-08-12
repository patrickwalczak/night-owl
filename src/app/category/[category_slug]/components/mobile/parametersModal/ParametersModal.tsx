import React, { useState } from 'react';
import { mergeClasses } from '@/utils/mergeClasses';
import styles from './parametersModal.module.scss';
import Modal from '@/components/modal/Modal';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import SortByGroup from '../sortByGroup/SortByGroup';
import { useQuery } from '@tanstack/react-query';

const ParametersModal = ({ isOpened, close }: { isOpened: boolean; close: () => void }) => {
	const router = useRouter();
	const pathname = usePathname();
	const current = useSearchParams();

	const { data } = useQuery({
		queryKey: ['category-parameters', pathname],
		queryFn: async () => {
			const res = await fetch(`/api${pathname}/parameters`, { cache: 'no-store' });
			if (!res.ok) throw new Error('Failed to load parameters');
			return res.json() as Promise<{
				parameters: Array<{ id: string; name: string; values: { id: string; value: string }[] }>;
			}>;
		},
	});

	function toggleValue(id: string) {
		setSelectedParamIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
	}

	const initialSort = current.get('sort') ?? 'popularity';
	const initialParamIds = (current.get('params') ?? '').split(',').filter(Boolean);

	const [sort, setSort] = useState(initialSort);
	const [selectedParamIds, setSelectedParamIds] = useState<string[]>(initialParamIds);

	function replaceParams(next: URLSearchParams) {
		next.delete('page');
		router.replace(`${pathname}?${next.toString()}`, { scroll: false });
	}

	function onApply() {
		const next = new URLSearchParams(current.toString());

		if (sort) next.set('sort', sort);
		else next.delete('sort');

		if (selectedParamIds.length) {
			next.set('params', selectedParamIds.join(','));
		} else {
			next.delete('params');
		}

		replaceParams(next);
		close();
	}

	function onReset() {
		const next = new URLSearchParams(current.toString());
		['q', 'sort', 'priceMin', 'priceMax', 'params', 'page'].forEach((k) => next.delete(k));
		replaceParams(next);
		close();
	}

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

					<div className={styles.body}>
						<div className={styles.filtersContainer}>
							<SortByGroup value={sort} onChange={setSort} />
						</div>

						{data?.parameters.map((param) => (
							<section key={param.id} className={mergeClasses(styles.paramSection, 'flex', 'flex-col')}>
								<h4 className={styles.paramHeading}>{param.name}</h4>
								<ul className={styles.paramValues}>
									{param.values.map((v) => {
										const checked = selectedParamIds.includes(v.id);
										const inputId = `param-${param.id}-${v.id}`;
										return (
											<li key={v.id}>
												<label className={styles.chk} htmlFor={inputId}>
													<input
														id={inputId}
														type="checkbox"
														name={`param-${param.id}`}
														value={v.id}
														checked={checked}
														onChange={() => toggleValue(v.id)}
													/>
													<span aria-hidden className={styles.chkBox} />
													<span className={styles.chkText}>{v.value}</span>
												</label>
											</li>
										);
									})}
								</ul>
							</section>
						))}
					</div>

					<footer className={mergeClasses(styles.footer, 'flex', 'justify-between')}>
						<button type="button" className={mergeClasses(styles.resetBtn, styles.footerBtn)} onClick={onReset}>
							Reset
						</button>
						<button type="button" className={mergeClasses(styles.showBtn, styles.footerBtn)} onClick={onApply}>
							Show results
						</button>
					</footer>
				</Modal.Wrapper>
			</Modal.Overlay>
		</Modal>
	);
};

export default ParametersModal;
