import Filters from '@/shared/ui/icons/Filters';
import { mergeClasses } from '@/utils/mergeClasses';
import styles from './filterButton.module.scss';

const FilterButton = ({
	label,
	handleClick,
	className,
}: {
	label: string;
	handleClick: () => void;
	className?: string;
}) => {
	return (
		<button
			type="button"
			onClick={handleClick}
			className={mergeClasses('flex', 'align-center', 'button-empty', styles.btn, className)}
		>
			{label}
			<Filters />
		</button>
	);
};

export default FilterButton;
