import {
    CatalogPage,
    CatalogStoreProvider,
    type CatalogData,
} from '@/pages/catalog';

async function getDummyCatalogData(): Promise<CatalogData> {
    // Symulacja danych zwracanych przez API lub bazę danych.
    return Promise.resolve({
        products: [
            { id: 'product-1', name: 'Night Owl T-shirt', price: 89.99 },
            { id: 'product-2', name: 'Night Owl Hoodie', price: 219.99 },
            { id: 'product-3', name: 'Night Owl Mug', price: 49.99 },
        ],
        categories: [
            { id: 'category-1', name: 'Odzież', productCount: 2 },
            { id: 'category-2', name: 'Akcesoria', productCount: 1 },
        ],
        parameters: [
            { parameterId: 'parameter-1', name: 'Rozmiar' },
            { parameterId: 'parameter-2', name: 'Kolor' },
            { parameterId: 'parameter-3', name: 'Materiał' },
        ],
    });
}

export default async function CatalogRoutePage() {
    const catalogData = await getDummyCatalogData();

    return (
        <CatalogStoreProvider initialData={catalogData}>
            <CatalogPage />
        </CatalogStoreProvider>
    );
}
