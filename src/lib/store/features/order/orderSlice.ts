import { CartItem } from '@/types/cartItem';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type OrderState = { items: CartItem[]; isCartOpen: boolean };

const initialState: OrderState = { items: [], isCartOpen: false };

const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		addItem: (state, action: PayloadAction<CartItem>) => {
			const existing = state.items.find((i) => i.id === action.payload.id);
			if (existing) existing.quantity += action.payload.quantity;
			else state.items.push(action.payload);
		},
		removeItem: (state, action: PayloadAction<string>) => {
			state.items = state.items.filter((i) => i.id !== action.payload);
		},
		clearCart: (state) => {
			state.items = [];
		},
		toggleCart: (state) => {
			state.isCartOpen = !state.isCartOpen;
		},
		openCart: (state) => {
			state.isCartOpen = true;
		},
		closeCart: (state) => {
			state.isCartOpen = false;
		},
		setQuantity: (state, action: PayloadAction<{ id: string; qty: number }>) => {
			const item = state.items.find((i) => i.id === action.payload.id);
			if (!item) return;
			const max = item.stock ?? 99;
			const q = Math.max(0, Math.min(action.payload.qty, max));
			if (q <= 0) state.items = state.items.filter((i) => i.id !== item.id);
			else item.quantity = q;
		},
		incrementItem: (state, action: PayloadAction<{ id: string }>) => {
			const item = state.items.find((i) => i.id === action.payload.id);
			if (!item) return;
			const max = item.stock ?? 99;
			item.quantity = Math.min(max, item.quantity + 1);
		},
		decrementItem: (state, action: PayloadAction<{ id: string }>) => {
			const item = state.items.find((i) => i.id === action.payload.id);
			if (!item) return;
			const next = item.quantity - 1;
			if (next <= 0) state.items = state.items.filter((i) => i.id !== item.id);
			else item.quantity = next;
		},
	},
});

export const {
	addItem,
	removeItem,
	clearCart,
	toggleCart,
	openCart,
	closeCart,
	setQuantity,
	incrementItem,
	decrementItem,
} = orderSlice.actions;

export default orderSlice.reducer;
