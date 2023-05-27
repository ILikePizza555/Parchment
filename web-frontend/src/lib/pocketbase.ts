import debug from 'debug';
import PocketBase, { ListResult, type ListQueryParams, BaseModel, type SendOptions, ClientResponseError, type BaseQueryParams } from 'pocketbase';
import { writable } from 'svelte/store'

const log = debug("app:lib:pocketbase");
const PUBLIC_POCKETBASE_URL = "http://127.0.0.1:8090";

type FetchFn = typeof fetch;

/**
 * Ensures that the body of the options is a JSON string and correct header is set.
 * @param options 
 */
function ensureJSONSendOptions(options: SendOptions) {
    if(options.body && typeof options.body !== "string") {
        options.body = JSON.stringify(options.body);
    }

    // add the json header (if not already)
    if (typeof options?.headers?.['Content-Type'] === 'undefined') {
        options.headers = Object.assign({}, options.headers, {
            'Content-Type': 'application/json',
        });
    }
}

/**
 * Builds a URL for pocketbase requests. 
 * @param path Path component of the URL. This is usually the API endpoint.
 * @param params Query parameter component of the URL. These are usually the API parameters.
 * @returns 
 */
function buildUrl(path: string, params?: BaseQueryParams): URL {
    const url = new URL(path, PUBLIC_POCKETBASE_URL);

    if (params) {
        for (const key in params) {
            if (params[key] === null) {
                continue;
            }

            const value = params[key];

            if (Array.isArray(value)) {
                for (const v of value) {
                    url.searchParams.append(key, v);
                }
            } else if (value instanceof Date) {
                url.searchParams.append(key, value.toISOString());
            } else if (typeof value !== null && typeof value === "object") {
                url.searchParams.append(key, JSON.stringify(value));
            } else {
                url.searchParams.append(key, value);
            }
        }
    }

    return url;
}

/**
 * Custom send function for PocketBase requests. 
 * 
 * Differences from PocketBase's `Client.send()`:
 * - Take a custom `fetch` function.
 * - Does not automatically add an Authorization header, as this is added by the SvelteKit fetch function.
 * - Does not have auto cancellation.
 * - No `beforeSend`.
 * - No `afterSend`.
 */
export async function send<T = any>(fetch: FetchFn, path: string, reqOptions: SendOptions): Promise<T> {
    let options: SendOptions = { method: "GET", ...reqOptions };

    ensureJSONSendOptions(options);

    const url = buildUrl(path, reqOptions.params);
    const response = await fetch(url, options);

    let data: any = {};
    try {
        data = await response.json()
    } catch (e) {
        log("Error: Response was not json.");
        throw new ClientResponseError(e);
    }

    if (response.status >= 400) {
        throw new ClientResponseError({
            url:    response.url,
            status: response.status,
            data:   data
        });
    }

    return data as T;
}

export async function getList<T extends BaseModel>(
    decode: (data: { [key: string]: any }) => T,
    fetch: FetchFn,
    basePath: string,
    page = 1,
    perPage = 30,
    queryParams: ListQueryParams = {}
): Promise<ListResult<T>> {
    queryParams = { "page": page, "perPage": perPage, ...queryParams };

    const responseData = await send(fetch, basePath, {"method": "GET", "params": queryParams});
    let items: T[] = [];

    if (responseData?.items) {
        items = responseData.items.map((v: any) => decode(v))
    }

    return new ListResult<T>(
        responseData?.page || 1,
        responseData?.perPage || 0,
        responseData?.totalItems || 0,
        responseData?.totalPages || 0,
        items);
}

export const pb = new PocketBase(PUBLIC_POCKETBASE_URL);

export const currentUserModel = writable(pb.authStore.model);