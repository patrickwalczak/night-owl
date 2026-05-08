import { Categories } from "./categories/Categories";
import { Hero } from "./hero/Hero";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Categories />
    </main>
  );
}
