import { type NextRequest, NextResponse } from 'next/server';

const CSP_REPORT_ENDPOINT_NAME = 'csp-endpoint';
const CSP_REPORT_PATH = '/api/csp-report';

function detect(
    uaRaw: string,
    chm: string | null,
): 'mobile' | 'tablet' | 'desktop' {
    const ua = uaRaw.toLowerCase();

    if (chm === '?1') return 'mobile';
    const isTablet
        = /ipad/.test(ua) || (/android/.test(ua) && !/mobile/.test(ua));
    if (isTablet) return 'tablet';
    const isPhone
        = /iphone|ipod|windows phone/.test(ua)
            || (/android/.test(ua) && /mobile/.test(ua));
    return isPhone ? 'mobile' : 'desktop';
}

function buildCspHeader(isDev: boolean): string {
    const directives = [
        `default-src 'self'`,
        `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
        `style-src 'self' 'unsafe-inline'`,
        `img-src 'self' blob: data: https://placehold.co`,
        `font-src 'self'`,
        `connect-src 'self'${isDev ? ' ws: http://localhost:*' : ''}`,
        `object-src 'none'`,
        `base-uri 'self'`,
        `form-action 'self'`,
        `frame-ancestors 'none'`,
        `report-uri ${CSP_REPORT_PATH}`,
        `report-to ${CSP_REPORT_ENDPOINT_NAME}`,
    ];

    if (!isDev) {
        directives.push('upgrade-insecure-requests');
    }

    return directives.join('; ');
}

export function proxy(req: NextRequest) {
    const device = detect(
        req.headers.get('user-agent') || '',
        req.headers.get('sec-ch-ua-mobile'),
    );
    const isDev = process.env.NODE_ENV === 'development';

    const headers = new Headers(req.headers);

    headers.set('x-device-type', device);
    const res = NextResponse.next({ request: { headers } });

    res.headers.set(
        'Reporting-Endpoints',
        `${CSP_REPORT_ENDPOINT_NAME}="${req.nextUrl.origin}${CSP_REPORT_PATH}"`,
    );
    res.headers.set('Content-Security-Policy', buildCspHeader(isDev));
    // Legacy frame-blocking header, similar to CSP's frame-ancestors 'none'.
    res.headers.set('X-Frame-Options', 'DENY');
    res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.headers.set('X-Content-Type-Options', 'nosniff');

    return res;
}

export const config = {
    matcher: [
        '/',
        '/category/:path*',
        '/((?!_next/static|_next/image|api|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|icon|apple-icon).*)',
    ],
};
