export function generateStaticParams() {
    return [
        'indoor-lighting',
        'hanging-lamps',
        'chandeliers',
        'ceiling-lamps',
        'ceiling-lights',
        'wall-lamps',
        'floor-lamps',
        'desk-lamps',
        'table-lamps',
    ].map(category_slug => ({ category_slug }));
}

export { CategoryPage as default } from '@/pages/category';
