import Categories from './components/categories/Categories';
import { Hero } from './components/hero/Hero';
import LightBulb from './components/lightbulb/LightBulb';

export default function Page() {
	return (
		<main>
			<Hero />
			<LightBulb />
			<Categories />
		</main>
	);
}
