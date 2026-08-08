import { NextResponse } from 'next/server';

const news = [
    {
        id: 'news-1',
        title: 'Nowa kolekcja Night Owl jest już dostępna',
        summary: 'Do katalogu trafiły nowe bluzy, koszulki i akcesoria.',
    },
    {
        id: 'news-2',
        title: 'Darmowa dostawa w ten weekend',
        summary: 'Zamówienia od 150 zł wysyłamy bez dodatkowych kosztów.',
    },
    {
        id: 'news-3',
        title: 'Program lojalnościowy wystartował',
        summary: 'Każde zamówienie może teraz zbierać punkty na kolejne zakupy.',
    },
];

export async function GET() {
    return NextResponse.json({
        items: news,
        generatedAt: new Date().toISOString(),
        requestId: crypto.randomUUID(),
    });
}
