import { ProductPageClient, ProductStoreProvider } from '@/pages/product';

interface ProductPageProps {
    params: Promise<{
        product_slug: string;
    }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { product_slug: productSlug } = await params;

    return (
        <ProductStoreProvider key={productSlug} slug={productSlug}>
            <ProductPageClient />
        </ProductStoreProvider>
    );
}
