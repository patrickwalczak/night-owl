export interface CatalogProduct {
    id: string;
    price: number;
    name: string;
}

export interface CatalogCategory {
    id: string;
    name: string;
    productCount: number;
}

export interface CatalogParameter {
    parameterId: string;
    name: string;
}

export interface CatalogData {
    products: CatalogProduct[];
    categories: CatalogCategory[];
    parameters: CatalogParameter[];
}
