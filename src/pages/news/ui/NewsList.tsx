'use client';

import { useNews } from '../model/useNews';

export default function NewsList() {
    const { data, error, isLoading, isValidating, mutate } = useNews();

    if (isLoading) return <p>{'Pobieranie aktualności...'}</p>;
    if (error) return <p role={'alert'}>{error.message}</p>;
    if (!data) return null;

    return (
        <section>
            <h2>{'Lista aktualności'}</h2>
            <ul>
                {data.items.map(item => (
                    <li key={item.id}>
                        <article>
                            <h3>{item.title}</h3>
                            <p>{item.summary}</p>
                        </article>
                    </li>
                ))}
            </ul>

            <button
                type={'button'}
                disabled={isValidating}
                onClick={() => void mutate()}
            >
                {isValidating ? 'Odświeżanie...' : 'Odśwież dane'}
            </button>

            <p>{`Request ID: ${data.requestId}`}</p>
            <p>{`Wygenerowano: ${new Date(data.generatedAt).toLocaleTimeString('pl-PL')}`}</p>
        </section>
    );
}
