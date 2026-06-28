import { cn } from '@/shared/lib/utils/cn';

import styles from './categoriesDropdown.module.scss';

export const NoCategoriesMessage = () => (
    <p className={cn('mobile-nav-element', styles.noCategories)}>{'No categories available'}</p>
);
