import { CategoriesSection } from './categories/CategoriesSection';
import { DrawerPreview } from './drawerPreview/DrawerPreview';
import { Hero } from './hero/Hero';
// import { ScssPreview } from './scssPreview/ScssPreview';

export default function HomePage() {
    return (
        <main>
            <Hero />
            <DrawerPreview />
            <CategoriesSection />
            {/* <ScssPreview /> */}
        </main>
    );
}
