import { cn } from '@/shared/lib/utils';
import { FiltersIcon } from '@/shared/ui/icons';

import styles from './filterButton.module.scss';

interface FilterButtonType {
    label: string;
    handleClick: () => void;
    className?: string;
}

const FilterButton = ({ label, handleClick, className }: FilterButtonType) => {
    return (
        <button
            onClick={handleClick}
            className={cn('flex', 'align-center', 'button-empty', styles.btn, className)}
        >
            {label}
            <FiltersIcon />
        </button>
    );
};

export default FilterButton;
