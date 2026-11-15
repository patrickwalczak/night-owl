import styles from './categoryProductCountSkeleton.module.scss';

export const CategoryProductCountSkeleton = () => (
    <span role={'status'} className={styles.placeholder}>
        <span className={'sr-only'}>{' Loading product count...'}</span>
    </span>
);
