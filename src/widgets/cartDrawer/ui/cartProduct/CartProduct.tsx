import { mergeClasses } from '@/utils/mergeClasses';
import Image from 'next/image';
import styles from './cartProduct.module.scss';
import AmountController from '../amountController/AmountController';
import { CartItem } from '@/types/cartItem';
import { formatPrice } from '@/utils/format';

const CartProduct = ({ item }: { item: CartItem }) => {
	const total = item.price * item.quantity;
	const formattedTotal = formatPrice(total, item.currency);

	return (
		<div className={mergeClasses(styles.product, 'flex')}>
			<div className={mergeClasses(styles.thumb, 'w-100')}>
				<Image
					src={'https://placehold.co/600x400.webp'}
					alt={'product.name'}
					fill
					priority={false}
					className={styles.img}
				/>
			</div>
			<span className={mergeClasses(styles.productName, 'truncate')}>{item.name}</span>
			<AmountController item={item} />
			<span className={mergeClasses(styles.productPrice)}>{formattedTotal}</span>
		</div>
	);
};

export default CartProduct;
