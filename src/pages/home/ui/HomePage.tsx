import { CategoriesSection } from './categories/CategoriesSection';
import { Hero } from './hero/Hero';
// import { ScssPreview } from './scssPreview/ScssPreview';

export const HomePage = () => {
    return (
        <main>
            <Hero />
            <CategoriesSection />
            {/* <ScssPreview /> */}
        </main>
    );
};
