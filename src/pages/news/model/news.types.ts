export interface NewsItem {
    id: string;
    title: string;
    summary: string;
}

export interface NewsResponse {
    items: NewsItem[];
    generatedAt: string;
    requestId: string;
}
