'use client';

import {
    selectCatalogCategories,
    selectCatalogParameters,
    selectCatalogProducts,
} from '../model/catalog.selectors';
import { useCatalogSelector } from '../model/client';

export default function CatalogPage() {
    const products = useCatalogSelector(selectCatalogProducts);
    const categories = useCatalogSelector(selectCatalogCategories);
    const parameters = useCatalogSelector(selectCatalogParameters);

    return (
        <main>
            <h1>{'Demo katalogu'}</h1>
            <p>
                {'Dane poniżej zostały przygotowane w Server Component i przekazane do dedykowanego store’a Redux przez provider katalogu.'}
            </p>

            <section>
                <h2>{'Produkty'}</h2>
                <ul>
                    {products.map(product => (
                        <li key={product.id}>
                            {product.name}
                            {' '}
                            {'—'}
                            {product.price.toFixed(2)}
                            {' '}
                            {'zł'}
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>{'Kategorie'}</h2>
                <ul>
                    {categories.map(category => (
                        <li key={category.id}>
                            {category.name}
                            {' '}
                            {'('}
                            {category.productCount}
                            {')'}
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>{'Parametry'}</h2>
                <ul>
                    {parameters.map(parameter => (
                        <li key={parameter.parameterId}>{parameter.name}</li>
                    ))}
                </ul>
            </section>
        </main>
    );
}
