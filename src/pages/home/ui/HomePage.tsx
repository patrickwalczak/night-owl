import { CategoriesSection } from './categories/CategoriesSection';
import { Hero } from './hero/Hero';
// import { ScssPreview } from './scssPreview/ScssPreview';

export default function HomePage() {
    return (
        <main>
            <Hero />
            <CategoriesSection />
            {/* <ScssPreview /> */}
        </main>
    );
}
