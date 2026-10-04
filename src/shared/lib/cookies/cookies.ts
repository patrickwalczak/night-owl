function getCookieStore(): CookieStore {
    if (typeof cookieStore === 'undefined') {
        throw new Error('Cookie Store API is not available in this environment.');
    }

    return cookieStore;
}

export async function setCookie(name: string, value: string, options: Omit<CookieInit, 'name' | 'value'> = {}): Promise<void> {
    await getCookieStore().set({ ...options, name, value });
}

export async function getCookie(name: string, options: Omit<CookieStoreGetOptions, 'name'> = {}): Promise<string | undefined> {
    const cookie = await getCookieStore().get({ ...options, name });

    return cookie?.value;
}

export async function deleteCookie(name: string, options: Omit<CookieStoreDeleteOptions, 'name'> = {}): Promise<void> {
    await getCookieStore().delete({ ...options, name });
}
