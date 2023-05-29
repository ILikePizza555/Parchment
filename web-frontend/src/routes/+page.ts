import { getList, pb } from "$lib/pocketbase";
import type { PageLoad } from './$types';
import { PostRecord, type UserRecord, type TagRecord } from "$lib/types";

interface PostRecordExpands {
    original_poster: UserRecord,
    tags: TagRecord[]
}

export const load = (async ({fetch}) => {
    const result = await getList(
        (data) => new PostRecord<PostRecordExpands>(data),
        fetch,
        "/api/collections/posts/records",
        1,
        30,
        { expand: ["original_poster", "tags" ] });

    return {
        postsIndex: new Map(result.items.map((v, i) => [v.id, i])),
        ...result
    };   

}) satisfies PageLoad;