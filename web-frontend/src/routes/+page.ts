import { getList, pb } from "$lib/pocketbase";
import { Record } from "pocketbase";
import type { PageLoad } from './$types';
import type { PostRecord } from "./types";

export const load = (async ({fetch}) => {
    const result = await getList(
        (data) => new Record(data) as PostRecord,
        fetch,
        "/api/collections/posts/records");

    return {
        postsIndex: new Map(result.items.map((v, i) => [v.id, i])),
        ...result
    };   

}) satisfies PageLoad;