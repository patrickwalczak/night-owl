export interface CartItem {
	id: string;
	name: string;
	image?: string;
	price: number;
	currency: string;
	quantity: number;
	stock?: number;
}
