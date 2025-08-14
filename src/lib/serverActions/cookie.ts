'use server';

import { cookies } from 'next/headers';

type ServerCookieOptions = {
	path?: string;
	domain?: string;
	httpOnly?: boolean;
	secure?: boolean;
	sameSite?: 'lax' | 'strict' | 'none';
	maxAge?: number;
	expires?: Date;
};

export async function getCookieServer(name: string): Promise<string | undefined> {
	return (await cookies()).get(name)?.value;
}

export async function getBoolCookieServer(name: string, fallback = false): Promise<boolean> {
	const v = await getCookieServer(name);
	return v == null ? fallback : v === '1' || v.toLowerCase() === 'true';
}

export async function setCookieServer(name: string, value: string, opts: ServerCookieOptions = {}) {
	if (opts.sameSite === 'none' && opts.secure !== true) {
		opts.secure = true;
	}
	(await cookies()).set({ name, value, ...opts });
}

export function setBoolCookieServer(name: string, value: boolean, opts?: ServerCookieOptions) {
	setCookieServer(name, value ? '1' : '0', opts);
}

export async function deleteCookieServer(name: string, path: string = '/') {
	(await cookies()).delete({ name, path });
}
