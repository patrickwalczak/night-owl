import { NextRequest, NextResponse } from 'next/server';

function detect(uaRaw: string, chm: string | null): 'mobile' | 'tablet' | 'desktop' {
	const ua = uaRaw.toLowerCase();

	if (chm === '?1') return 'mobile';
	const isTablet = /ipad/.test(ua) || (/android/.test(ua) && !/mobile/.test(ua));
	if (isTablet) return 'tablet';
	const isPhone = /iphone|ipod|windows phone/.test(ua) || (/android/.test(ua) && /mobile/.test(ua));
	return isPhone ? 'mobile' : 'desktop';
}

export function middleware(req: NextRequest) {
	const device = detect(req.headers.get('user-agent') || '', req.headers.get('sec-ch-ua-mobile'));

	const headers = new Headers(req.headers);

	headers.set('x-device-type', device);
	const res = NextResponse.next({ request: { headers } });
	return res;
}

export const config = {
	matcher: [
		'/',
		'/category/:path*',
		'/((?!_next/static|_next/image|api|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|icon|apple-icon).*)',
	],
};
