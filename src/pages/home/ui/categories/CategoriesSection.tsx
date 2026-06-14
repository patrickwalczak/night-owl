import styles from './categories.module.scss';
import { CategoryBanner } from './CategoryBanner';
import { CategoryTile } from './CategoryTile';

export const CategoriesSection = () => {
    return (
        <div className={styles.container}>
            <CategoryTile
                href={'#'}
                title={'Outdoor Lighting'}
                description={
                    'Illuminate your garden, patio, and entrance with stylish outdoor lighting made for every evening.'
                }
                image={{ alt: 'Outdoor lighting', src: '/cat_img_outdoor_lighting.webp' }}
            />

            <CategoryTile
                href={'#'}
                title={'Indoor Lighting'}
                description={
                    'Bring warmth and character to every room with indoor lighting made for cozy, beautiful interiors.'
                }
                image={{ alt: 'Indoor lighting', src: '/cat_img_indoor_lighting.webp' }}
            />

            <CategoryTile
                href={'#'}
                title={'Accessories'}
                description={'Complete your lighting setup with bulbs, cords, switches, and stylish accessories.'}
                image={{ alt: 'Accessories', src: '/cat_img_accessories.webp' }}
            />
            <CategoryBanner
                href={'#'}
                title={'Lighting made for every mood'}
                description={'Find the perfect lighting setup for your space.'}
                linkLabel={'Shop all products'}
            />
        </div>
    );
};
