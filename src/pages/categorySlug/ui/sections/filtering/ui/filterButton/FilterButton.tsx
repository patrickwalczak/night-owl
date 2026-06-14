import { cn } from '@/shared/lib/utils/cn';
import Filters from '@/shared/ui/icons/Filters';

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
            <Filters />
        </button>
    );
};

export default FilterButton;
