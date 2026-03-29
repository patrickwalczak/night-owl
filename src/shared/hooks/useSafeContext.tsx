import { useContext, Context } from 'react';

export function useSafeContext<T>(context: Context<T | null>): T {
	const ctx = useContext(context);

	if (!ctx) throw new Error('Context must be used within its Provider');

	return ctx;
}
