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

    const postsIndex = new Map<string, number>();
    const postUsers = new Map<string, UserRecord>();
    const tagInfo = new Map<string, TagRecord>();

    for (const [i, post] of result.items.entries()) {
        postsIndex.set(post.id, i);

        const {original_poster: op, tags} = post.expand;
        postUsers.set(op.id, op);

        for (const tag of tags) {
            tagInfo.set(tag.id, tag)
        }
    }

    return {
        postsIndex,
        postUsers,
        tagInfo,
        ...result
    };   

}) satisfies PageLoad;