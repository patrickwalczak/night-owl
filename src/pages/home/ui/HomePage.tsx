import { CategoriesSection } from './categories/CategoriesSection';
import { Hero } from './hero/Hero';
// import { TempRadio } from './TempRadio';

export default function HomePage() {
    return (
        <main>
            <Hero />
            <CategoriesSection />
            {/* <TempRadio /> */}
        </main>
    );
}
