import type React from 'react';

import { decrementItem, incrementItem, setQuantity, removeItem } from '@/features/orderState/model/orderSlice';
import { useAppDispatch } from '@/shared/lib/redux';
import { cn } from '@/shared/lib/utils/cn';
import { type CartItem } from '@/shared/model/cartItem';

import TrashBin from '../../../../shared/ui/icons/TrashBin';
import styles from './amountController.module.scss';

const AmountController = ({ item }: { item: CartItem }) => {
    const { id, quantity } = item;
    const max = item.stock ?? 99;
    const dispatch = useAppDispatch();

    const onDecrement = () => {
        if (quantity > 1) dispatch(decrementItem({ id }));
        else dispatch(removeItem(id));
    };

    const onIncrement = () => {
        if (quantity >= max) return;
        dispatch(incrementItem({ id }));
    };

    const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.valueAsNumber;
        if (Number.isNaN(raw)) return;
        const q = Math.max(0, Math.min(raw, max));
        if (q <= 0) dispatch(removeItem(id));
        else dispatch(setQuantity({ id, qty: q }));
    };

    return (
        <div className={cn(styles.wrap, 'flex', 'align-center')}>
            <button
                type={'button'}
                className={styles.iconBtn}
                aria-label={quantity > 1 ? 'Decrease quantity' : 'Remove item'}
                onClick={onDecrement}
            >
                {quantity > 1 ? '−' : <TrashBin />}
            </button>

            <input
                type={'number'}
                className={styles.value}
                inputMode={'numeric'}
                min={1}
                max={max}
                step={1}
                value={quantity}
                onChange={onInput}
                aria-label={'Quantity'}
            />

            <button
                type={'button'}
                className={styles.plusBtn}
                aria-label={'Increase quantity'}
                onClick={onIncrement}
                disabled={quantity >= max}
            >
                {'+'}
            </button>
        </div>
    );
};

export default AmountController;
