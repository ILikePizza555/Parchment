import { pb } from '$lib/pocketbase'
import type { Handle } from '@sveltejs/kit'

export const handle = (async ({event, resolve}) => {
    // Server-side auth validation, which we use for SSR
    pb.authStore.loadFromCookie(event.request.headers.get("cookie") || "")
    try {
        // Get up-to-date auth store state by verifying and refreshing the loaded auth model
        pb.authStore.isValid && await pb.collection("users").authRefresh();
    } catch (_) {
        // Clear the auth store on failed refresh
        pb.authStore.clear();
    }

    event.locals.pb = pb;
    event.locals.user = structuredClone(pb.authStore.model);

    const response = await resolve(event);

    response.headers.set(
        "set-cookie",
        pb.authStore.exportToCookie({ httpOnly: false })
    );

    return response;
}) satisfies Handle;