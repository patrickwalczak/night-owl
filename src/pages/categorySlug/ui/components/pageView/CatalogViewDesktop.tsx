import styles from './catalogView.module.scss';
import { mergeClasses } from '@/utils/mergeClasses';
import SideFiltersDesktop from '../../sections/filtering/ui/sideFiltersDesktop/SideFiltersDesktop';
import ProductsInfinite from '../../sections/productList/ui/productsInfinite/ProductsInfinite';
import StickyViewDesktop from '../stickyContainer/StickyViewDesktop';
import { Checkbox } from '@/shared/ui/checkbox/Checkbox';

export default function CatalogContainer() {
	return (
		<main className={mergeClasses(styles.container, 'flex', 'flex-col')}>
			<Checkbox.Root id="color_red" checkedValue="">
				<Checkbox.Input id="color_red" name="color" value="color_red" />
				<Checkbox.Label id="color_red" text="Red" className={''} />
			</Checkbox.Root>
			<StickyViewDesktop />

			<div className={styles.productsContainer}>
				<SideFiltersDesktop />
				<ProductsInfinite />
			</div>
		</main>
	);
}
