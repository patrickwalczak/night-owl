import { RadioInput } from '@/shared/ui/radioInput/RadioInput';

import { CategoriesSection } from './categories/CategoriesSection';
import { Hero } from './hero/Hero';

export default function HomePage() {
    return (
        <main>
            <Hero />
            <CategoriesSection />
            <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <RadioInput label={'Label'} />
            </div>
        </main>
    );
}
