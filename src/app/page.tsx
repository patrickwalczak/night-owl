import Navigation from '@/components/navigation/Navigation';
import { Hero } from './(home)/components/hero/Hero';
import styles from './(home)/home.module.scss';

export default function Home() {
	return (
		<>
			<Navigation position="absolute" />
			<Hero />
		</>
	);
}
