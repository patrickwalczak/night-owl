'use client';

export type CookieOptions = {
	maxAge?: number; // seconds
	expires?: Date; // absolute expiry
	path?: string; // default '/'
	domain?: string;
	sameSite?: 'lax' | 'strict' | 'none';
	secure?: boolean; // default true on https
};

const escapeRe = (s: string) => s.replace(/[-.*+?^${}()|[\]\\]/g, '\\$&');

export function serializeCookie(name: string, value: string, opts: CookieOptions = {}) {
	const enc = encodeURIComponent;
	const sameSite = opts.sameSite;
	const mustSecure = sameSite === 'none';
	const isHttps = typeof location !== 'undefined' && location.protocol === 'https:';

	let str = `${name}=${enc(value)}`;
	if (opts.maxAge != null) str += `; Max-Age=${Math.floor(opts.maxAge)}`;
	if (opts.expires) str += `; Expires=${opts.expires.toUTCString()}`;
	str += `; Path=${opts.path ?? '/'}`;
	if (opts.domain) str += `; Domain=${opts.domain}`;
	if (sameSite) str += `; SameSite=${sameSite[0].toUpperCase()}${sameSite.slice(1)}`;
	if (opts.secure ?? mustSecure ?? isHttps) str += `; Secure`;
	return str;
}

export function setCookieClient(name: string, value: string, opts?: CookieOptions) {
	if (typeof document === 'undefined') return;
	document.cookie = serializeCookie(name, value, opts);
}

export function getCookieClient(name: string): string | undefined {
	if (typeof document === 'undefined') return;
	const m = document.cookie.match(new RegExp(`(?:^|; )${escapeRe(name)}=([^;]*)`));
	return m ? decodeURIComponent(m[1]) : undefined;
}

export function deleteCookieClient(name: string, path = '/') {
	setCookieClient(name, '', { path, maxAge: 0 });
}

export function getBoolCookieClient(name: string, fallback = false) {
	const v = getCookieClient(name);
	return v == null ? fallback : v === '1' || v.toLowerCase() === 'true';
}
export function setBoolCookieClient(name: string, value: boolean, opts?: CookieOptions) {
	setCookieClient(name, value ? '1' : '0', opts);
}
