import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CartItem = {
	id: string;
	name: string;
	price: number;
	quantity: number;
};

type OrderState = {
	items: CartItem[];
	isCartOpen: boolean;
};

const initialState: OrderState = {
	items: [],
	isCartOpen: false,
};

const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		addItem: (state, action: PayloadAction<CartItem>) => {
			const existing = state.items.find((item) => item.id === action.payload.id);
			if (existing) {
				existing.quantity += action.payload.quantity;
			} else {
				state.items.push(action.payload);
			}
		},
		removeItem: (state, action: PayloadAction<string>) => {
			state.items = state.items.filter((item) => item.id !== action.payload);
		},
		clearCart: (state) => {
			state.items = [];
		},
		toggleCart: (state) => {
			state.isCartOpen = !state.isCartOpen;
		},
		setCartOpen: (state, action: PayloadAction<boolean>) => {
			state.isCartOpen = action.payload;
		},
	},
});

export const { addItem, removeItem, clearCart, toggleCart, setCartOpen } = orderSlice.actions;

export default orderSlice.reducer;
