import Listing from './components/listing/Listing';

export default async function Catalog({
	params,
	searchParams,
}: {
	params: Promise<{ category_slug: string }>;
	searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
	const p = await params;
	const sp = await searchParams;

	return (
		<main>
			<Listing params={p} searchParams={sp} />
		</main>
	);
}
