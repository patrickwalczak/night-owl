import { notFound } from 'next/navigation';
import styles from './styles.module.scss';
import Link from 'next/link';
import { getProductFullBySlug } from '@/lib/serverActions/product';
import { mergeClasses } from '@/utils/mergeClasses';
import ProductHero from './components/productHero/ProductHero';
import RelatedProducts from './components/relatedProducts/RelatedProducts';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
	const awaitedParams = await params;
	const data = await getProductFullBySlug(awaitedParams.slug);

	if (!data) return notFound();

	const { breadcrumbs } = data;

	return (
		<main className={mergeClasses(styles.page, 'flex', 'flex-col')}>
			<nav className={styles.breadcrumbs} aria-label="Breadcrumb">
				<ol className={'flex'}>
					<li>
						<Link href="/">Home</Link>
					</li>
					{breadcrumbs.map((c) => (
						<li key={c.id}>
							<a href={`/category/${c.slug}`}>{c.name}</a>
						</li>
					))}
				</ol>
			</nav>
			<ProductHero data={data} />
			<RelatedProducts products={data.related} />
		</main>
	);
}
