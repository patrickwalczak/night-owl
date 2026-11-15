import { cn } from '@/shared/lib/utils';
import { Drawer } from '@/shared/ui/drawer';

import { useCategoryPageSelector } from '../../../../model/store/client';
import { FilterActions } from '../filterActions/FilterActions';
import { ParameterBox } from '../parameterBox/ParameterBox';
import styles from './filtersDrawer.module.scss';

export const FiltersDrawer = ({ isOpen, close }: { isOpen: boolean; close: () => void }) => {
    const parameters = useCategoryPageSelector(state => state.categoryListing.parameters);

    return (
        <Drawer.Main open={isOpen} onClose={close} position={'left'}>
            <div
                id={'filters-modal'}
                className={cn(styles.modal)}
            >
                <Drawer.Header>
                    <Drawer.Heading>{'Filters'}</Drawer.Heading>
                    <Drawer.Close />
                </Drawer.Header>

                <div className={cn(styles.body, 'flex', 'flex-col')}>
                    {parameters.map(parameter => (
                        <ParameterBox key={parameter.id} parameter={parameter} />
                    ))}
                </div>
                <FilterActions className={styles.actions} onApply={close} />
            </div>
        </Drawer.Main>
    );
};
