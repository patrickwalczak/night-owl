import Link from 'next/link';

import { CategoriesSection } from './categories/CategoriesSection';
import { Hero } from './hero/Hero';
import { TempRadio } from './TempRadio';

export default function HomePage() {
    return (
        <main>
            <Hero />
            <CategoriesSection />
            <TempRadio />
            <Link href={'/product/demo-one'}>{'Product'}</Link>
        </main>
    );
}
