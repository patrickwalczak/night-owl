import { UrlParamType, SearchParamsType } from '@/types/catalog.models';
import CatalogView from './components/catalog/Catalog';
import { normalizeSearchParams, parseListingParams } from '@/utils/url';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import CatalogProvider from './providers/CatalogProvider';
import { getCategoryPageData } from '@/lib/serverActions/categoryPage';
import { CatalogUrlActionsProvider } from './providers/CatalogUrlActionsProvider';

export default async function Catalog({
	params,
	searchParams,
}: {
	params: Promise<UrlParamType>;
	searchParams: Promise<SearchParamsType>;
}) {
	const [awaitedParams, awaitedSearchParams] = await Promise.all([params, searchParams]);

	const { category_slug } = awaitedParams;
	const search = normalizeSearchParams(awaitedSearchParams);
	const parsed = parseListingParams(search);

	try {
		const { category, parameters, products } = await getCategoryPageData(category_slug, parsed);

		if (!category) notFound();

		const areFiltersOpen = (await cookies()).get('areFiltersOpen')?.value === '1';

		return (
			<CatalogProvider
				initialProductsProp={products}
				category={category}
				areFiltersOpen={areFiltersOpen}
				parameters={parameters}
			>
				<CatalogUrlActionsProvider>
					<CatalogView />
				</CatalogUrlActionsProvider>
			</CatalogProvider>
		);
	} catch (error) {
		console.log(error);
		notFound();
	}
}
