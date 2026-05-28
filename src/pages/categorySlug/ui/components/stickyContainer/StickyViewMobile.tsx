'use client';

import { mergeClasses } from '@/utils/mergeClasses';

import FiltersDialog from '../../sections/filtering/ui/filtersDialogMobile/FiltersDialog';
import CategoryProductsTotal from '../categoryProductsTotal/CategoryProductsTotal';
import StickyContainer from './StickyContainer';

const StickyViewMobile = () => {
    return (
        <StickyContainer>
            <>
                <CategoryProductsTotal />
                <div className={mergeClasses('flex', 'align-center', 'gap-1')}>
                    <FiltersDialog />
                </div>
            </>
        </StickyContainer>
    );
};

export default StickyViewMobile;
