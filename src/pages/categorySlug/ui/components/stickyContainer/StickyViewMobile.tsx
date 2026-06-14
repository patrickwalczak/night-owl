'use client';

import { cn } from '@/shared/lib/utils/cn';

import FiltersDialog from '../../sections/filtering/ui/filtersDialogMobile/FiltersDialog';
import CategoryProductsTotal from '../categoryProductsTotal/CategoryProductsTotal';
import StickyContainer from './StickyContainer';

const StickyViewMobile = () => {
    return (
        <StickyContainer>
            <>
                <CategoryProductsTotal />
                <div className={cn('flex', 'align-center', 'gap-1')}>
                    <FiltersDialog />
                </div>
            </>
        </StickyContainer>
    );
};

export default StickyViewMobile;
