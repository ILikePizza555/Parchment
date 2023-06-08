import { getList, pb } from "$lib/pocketbase";
import type { PageLoad } from './$types';
import { PostRecord, type UserRecord, type TagRecord } from "$lib/types";
import SortedMap from "$lib/SortedMap";

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

    const postCollection = new SortedMap<string, PostRecord, Date>((post) => post.createdDate);
    const userCollection = new Map<string, UserRecord>();
    const tagCollection = new Map<string, TagRecord>();

    for (const post of result.items.values()) {
        const {original_poster: user, tags} = post.expand;
        postCollection.set(post.id, post);
        userCollection.set(user.id, user);
        
        for (const tag of tags) {
            tagCollection.set(tag.id, tag);
        }
    }

    return {
        postCollection,
        userCollection,
        tagCollection,
        page: result.page,
        perPage: result.perPage,
        totalPages: result.totalPages,
        totalItems: result.totalItems
    };

}) satisfies PageLoad;