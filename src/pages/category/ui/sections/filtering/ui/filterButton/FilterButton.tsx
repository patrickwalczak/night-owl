import { cn } from '@/shared/lib/utils';
import { FiltersIcon } from '@/shared/ui/icons';

interface FilterButtonType {
    label: string;
    handleClick: () => void;
    className?: string;
}

const FilterButton = ({ label, handleClick, className }: FilterButtonType) => {
    return (
        <button
            onClick={handleClick}
            className={cn(className)}
        >
            {label}
            <FiltersIcon />
        </button>
    );
};

export default FilterButton;
