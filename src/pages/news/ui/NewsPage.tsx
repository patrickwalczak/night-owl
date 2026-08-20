import NewsList from './NewsList';
import NewsSummary from './NewsSummary';

export default function NewsPage() {
    return (
        <main>
            <h1>{'SWR — demonstracja'}</h1>
            <p>
                {'Dwa komponenty poniżej używają useSWR z tym samym kluczem /api/news. SWR współdzieli ich cache i deduplikuje równoczesne zapytania.'}
            </p>

            <NewsSummary />
            <NewsList />
        </main>
    );
}
