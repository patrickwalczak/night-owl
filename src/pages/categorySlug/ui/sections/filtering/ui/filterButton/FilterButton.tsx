import Filters from '@/shared/ui/icons/Filters';
import { mergeClasses } from '@/utils/mergeClasses';
import styles from './filterButton.module.scss';

type FilterButtonType = {
	label: string;
	handleClick: () => void;
	className?: string;
};

const FilterButton = ({ label, handleClick, className }: FilterButtonType) => {
	return (
		<button
			onClick={handleClick}
			className={mergeClasses('flex', 'align-center', 'button-empty', styles.btn, className)}
		>
			{label}
			<Filters />
		</button>
	);
};

export default FilterButton;
