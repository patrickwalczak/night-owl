'use client';

import useSWR from 'swr';

import type { NewsResponse } from './news.types';

const NEWS_KEY = '/api/news';

const fetcher = async (url: string): Promise<NewsResponse> => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Nie udało się pobrać aktualności.');
    }

    return response.json() as Promise<NewsResponse>;
};

export const useNews = () =>
    useSWR(NEWS_KEY, fetcher, {
        dedupingInterval: 5_000,
        revalidateOnFocus: true,
    });
