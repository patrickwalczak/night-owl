import { UrlParamType, SearchParamsType } from '@/types/catalog.models';
import CatalogView from './components/catalogView/CatalogView';

export default async function CatalogServer({
	params,
	searchParams,
}: {
	params: Promise<UrlParamType>;
	searchParams: Promise<SearchParamsType>;
}) {
	const awaitedParams = await params;
	const awaitedSearchParams = await searchParams;

	return <CatalogView params={awaitedParams} searchParams={awaitedSearchParams} />;
}
