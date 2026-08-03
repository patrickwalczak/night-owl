import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface ProductState {
    slug: string;
    quantity: number;
    notes: string;
}

const initialState: ProductState = {
    slug: '',
    quantity: 1,
    notes: '',
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        decrementQuantity(state) {
            state.quantity = Math.max(1, state.quantity - 1);
        },
        incrementQuantity(state) {
            state.quantity += 1;
        },
        setNotes(state, action: PayloadAction<string>) {
            state.notes = action.payload;
        },
    },
});

export const { decrementQuantity, incrementQuantity, setNotes } = productSlice.actions;
export default productSlice.reducer;
