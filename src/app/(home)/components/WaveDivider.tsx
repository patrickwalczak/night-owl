export function WaveDivider({ from = '#7C6AA8', to = '#171A1F' }) {
	return (
		<svg viewBox="0 0 1440 120" preserveAspectRatio="none" width="100%" height="120">
			<path d="M0,40 C360,120 1080,-40 1440,40 L1440,120 L0,120 Z" fill={to} />
			<rect width="1440" height="40" y="-40" fill={from} />
		</svg>
	);
}
