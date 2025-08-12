import Listing from './components/listing/Listing';
import { SearchParamsType, UrlParamType } from '@/types/types';

export default async function Catalog({
	params,
	searchParams,
}: {
	params: Promise<UrlParamType>;
	searchParams: Promise<SearchParamsType>;
}) {
	const awaitedParams = await params;
	const awaitedSearchParams = await searchParams;

	return (
		<main>
			<Listing params={awaitedParams} searchParams={awaitedSearchParams} />
		</main>
	);
}
