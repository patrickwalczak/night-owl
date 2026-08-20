'use client';

import { useNews } from '../model/useNews';

export default function NewsSummary() {
    const { data, isLoading } = useNews();

    return (
        <aside>
            <h2>{'Drugi komponent korzystający z useSWR'}</h2>
            <p>
                {isLoading
                    ? 'Oczekiwanie na wspólne dane...'
                    : `Liczba aktualności: ${data?.items.length ?? 0}`}
            </p>
            {data && <p>{`Ten sam request ID: ${data.requestId}`}</p>}
        </aside>
    );
}
