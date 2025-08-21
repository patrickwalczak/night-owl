export const formatPrice = (value: number, currency: string) =>
	new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value);
