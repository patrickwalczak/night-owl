import { UrlParamType, SearchParamsType } from '@/types/catalog.models';
import Listing from './components/listing/Listing';

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
