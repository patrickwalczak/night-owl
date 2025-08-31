import React from 'react';
import styles from './hero.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { mergeClasses } from '@/utils/mergeClasses';
import { getCategoriesAction } from '@/actions/getCategoriesAction';

export const Hero = async () => {
	const categories = await getCategoriesAction();

	return (
		<section className={mergeClasses(styles.container, 'align-center', 'justify-center')}>
			{/* <Bulb /> */}

			<div className={`${styles.textContentContainer} flex flex-col align-center justify-center`}>
				<h1 className={styles.heading}>
					<span>Lighting</span>
					<span>That</span>
					<span>Shines</span>
					<span>Beyond</span>
					<span>the</span>
					<span>Darkness</span>
				</h1>

				<Link className={mergeClasses(styles.shopBtn, 'transition-200')} href={`/category/${categories[0].slug}`}>
					Shop now
				</Link>
			</div>
			<Image
				className={styles.heroImage}
				src={'/owl.webp'}
				alt={'Decorative background with an owl'}
				width={3600}
				height={4500}
				priority
			/>
		</section>
	);
};

function Bulb() {
	return (
		<svg
			className={styles.toggleScene}
			xmlns="http://www.w3.org/2000/svg"
			preserveAspectRatio="xMinYMin"
			viewBox="0 0 197.451 481.081"
		>
			<defs>
				<marker key="a" id="a" orient="auto" overflow="visible" refX="0" refY="0">
					<path
						className={styles.cordEnd}
						fillRule="evenodd"
						strokeWidth=".2666"
						d="M.98 0a1 1 0 11-2 0 1 1 0 012 0z"
					/>
				</marker>

				<clipPath id="g" clipPathUnits="userSpaceOnUse">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="4.677"
						d="M-774.546 827.629s12.917-13.473 29.203-13.412c16.53.062 29.203 13.412 29.203 13.412v53.6s-8.825 16-29.203 16c-21.674 0-29.203-16-29.203-16z"
					/>
				</clipPath>
				<clipPath id="f" clipPathUnits="userSpaceOnUse">
					<path d="M-868.418 945.051c-4.188 73.011 78.255 53.244 150.216 52.941 82.387-.346 98.921-19.444 98.921-47.058 0-27.615-4.788-42.55-73.823-42.55-69.036 0-171.436-30.937-175.314 36.667z" />
				</clipPath>
			</defs>

			{/* Cords */}
			<g className={styles.cords}>
				<path
					className={styles.cord}
					markerEnd="url(#a)"
					fill="none"
					strokeLinecap="square"
					strokeWidth="6"
					d="M100-28.56v150.493"
					// transform="translate(-24.503 256.106)"
				/>
			</g>

			{/* Bulb */}
			<g className={styles.bulb} transform="translate(844.069 -550.213)">
				<path
					className={styles.cap}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="4.677"
					d="M-774.546 827.629s12.917-13.473 29.203-13.412c16.53.062 29.203 13.412 29.203 13.412v53.6s-8.825 16-29.203 16c-21.674 0-29.203-16-29.203-16z"
				/>
				<path
					className={styles.capShine}
					d="M-778.379 802.873h25.512v118.409h-25.512z"
					clipPath="url(#g)"
					transform="matrix(.52452 0 0 .90177 -368.282 82.976)"
				/>
				<path
					className={styles.cap}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="4"
					d="M-774.546 827.629s12.917-13.473 29.203-13.412c16.53.062 29.203 13.412 29.203 13.412v0s-8.439 10.115-28.817 10.115c-21.673 0-29.59-10.115-29.59-10.115z"
				/>
				<path
					className={styles.capOutline}
					fill="none"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="4.677"
					d="M-774.546 827.629s12.917-13.473 29.203-13.412c16.53.062 29.203 13.412 29.203 13.412v53.6s-8.825 16-29.203 16c-21.674 0-29.203-16-29.203-16z"
				/>
				<g className={styles.filament} fill="none" strokeLinecap="round" strokeWidth="5">
					<path d="M-752.914 823.875l-8.858-33.06" />
					<path d="M-737.772 823.875l8.858-33.06" />
				</g>
				<path
					className={styles.bulbShape}
					strokeLinecap="round"
					strokeWidth="5"
					d="M-783.192 803.855c5.251 8.815 5.295 21.32 13.272 27.774 12.299 8.045 36.46 8.115 49.127 0 7.976-6.454 8.022-18.96 13.273-27.774 3.992-6.7 14.408-19.811 14.408-19.811 8.276-11.539 12.769-24.594 12.769-38.699 0-35.898-29.102-65-65-65-35.899 0-65 29.102-65 65 0 13.667 4.217 26.348 12.405 38.2 0 0 10.754 13.61 14.746 20.31z"
					transform="rotate(180 -745.343 743.939)"
				/>
				<path
					className={styles.shine}
					fill="none"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="12"
					d="M-789.19 757.501a45.897 45.897 0 013.915-36.189 45.897 45.897 0 0129.031-21.957"
				/>
			</g>
		</svg>
	);
}

function BulbCopy() {
	return (
		<svg
			className={styles.toggleScene}
			xmlns="http://www.w3.org/2000/svg"
			preserveAspectRatio="xMinYMin"
			viewBox="0 0 197.451 481.081"
		>
			<defs>
				<marker key={'a'} id={'a'} orient="auto" overflow="visible" refX="0" refY="0">
					<path
						className={styles.cordEnd}
						fillRule="evenodd"
						strokeWidth=".2666"
						d="M.98 0a1 1 0 11-2 0 1 1 0 012 0z"
					/>
				</marker>

				<clipPath id="g" clipPathUnits="userSpaceOnUse">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="4.677"
						d="M-774.546 827.629s12.917-13.473 29.203-13.412c16.53.062 29.203 13.412 29.203 13.412v53.6s-8.825 16-29.203 16c-21.674 0-29.203-16-29.203-16z"
					/>
				</clipPath>
				<clipPath id="f" clipPathUnits="userSpaceOnUse">
					<path d="M-868.418 945.051c-4.188 73.011 78.255 53.244 150.216 52.941 82.387-.346 98.921-19.444 98.921-47.058 0-27.615-4.788-42.55-73.823-42.55-69.036 0-171.436-30.937-175.314 36.667z" />
				</clipPath>
			</defs>

			{/* Cords */}
			<g className={styles.cords}>
				<path
					className={styles.cord}
					markerEnd="url(#a)"
					fill="none"
					strokeLinecap="square"
					strokeWidth="6"
					d="M123.228-28.56v150.493"
					transform="translate(-24.503 256.106)"
				/>

				<g className={styles.dummyCord}>
					<line markerEnd="url(#a)" x1="98.7255" x2="98.7255" y1="240.5405" y2="380.5405" />
				</g>
			</g>

			{/* Bulb */}
			<g className={styles.bulb} transform="translate(844.069 -645.213)">
				<path
					className={styles.cap}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="4.677"
					d="M-774.546 827.629s12.917-13.473 29.203-13.412c16.53.062 29.203 13.412 29.203 13.412v53.6s-8.825 16-29.203 16c-21.674 0-29.203-16-29.203-16z"
				/>
				<path
					className={styles.capShine}
					d="M-778.379 802.873h25.512v118.409h-25.512z"
					clipPath="url(#g)"
					transform="matrix(.52452 0 0 .90177 -368.282 82.976)"
				/>
				<path
					className={styles.cap}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="4"
					d="M-774.546 827.629s12.917-13.473 29.203-13.412c16.53.062 29.203 13.412 29.203 13.412v0s-8.439 10.115-28.817 10.115c-21.673 0-29.59-10.115-29.59-10.115z"
				/>
				<path
					className={styles.capOutline}
					fill="none"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="4.677"
					d="M-774.546 827.629s12.917-13.473 29.203-13.412c16.53.062 29.203 13.412 29.203 13.412v53.6s-8.825 16-29.203 16c-21.674 0-29.203-16-29.203-16z"
				/>
				<g className={styles.filament} fill="none" strokeLinecap="round" strokeWidth="5">
					<path d="M-752.914 823.875l-8.858-33.06" />
					<path d="M-737.772 823.875l8.858-33.06" />
				</g>
				<path
					className={styles.bulbShape}
					strokeLinecap="round"
					strokeWidth="5"
					d="M-783.192 803.855c5.251 8.815 5.295 21.32 13.272 27.774 12.299 8.045 36.46 8.115 49.127 0 7.976-6.454 8.022-18.96 13.273-27.774 3.992-6.7 14.408-19.811 14.408-19.811 8.276-11.539 12.769-24.594 12.769-38.699 0-35.898-29.102-65-65-65-35.899 0-65 29.102-65 65 0 13.667 4.217 26.348 12.405 38.2 0 0 10.754 13.61 14.746 20.31z"
				/>
				<path
					className={styles.shine}
					fill="none"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="12"
					d="M-789.19 757.501a45.897 45.897 0 013.915-36.189 45.897 45.897 0 0129.031-21.957"
				/>
			</g>
		</svg>
	);
}
