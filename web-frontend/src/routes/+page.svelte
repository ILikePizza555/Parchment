<script lang="ts">
    import { pb } from "$lib/pocketbase";
    import type { PageData } from "./$types";
    import debug from "debug";
	import { onDestroy, onMount } from "svelte";
	import { PostRecord, type TagRecord, type UserRecord } from "$lib/types";
	import Post from "../components/Post.svelte";
	import type { Record, RecordSubscription } from "pocketbase";

    export let data: PageData;
    let {postsIndex, items, postUsers, tagInfo} = data;

    const log = debug("app:routes:page");
    const USER_COLLECTION_KEY = "users";
    const POST_COLLECTION_KEY = "posts";
    const TAG_COLLECTION_KEY = "tags";

    async function fetchPoster(p: PostRecord): Promise<UserRecord> {
        let poster = postUsers.get(p.original_poster);

        if (!poster) {
            poster = await pb.collection(USER_COLLECTION_KEY).getOne<UserRecord>(p.original_poster);
            postUsers.set(poster.id, poster);
        }

        return poster;
    }

    async function fetchTag(tagId: string): Promise<TagRecord> {
        let tag = tagInfo.get(tagId);

        if (!tag) {
            tag = await pb.collection(TAG_COLLECTION_KEY).getOne<TagRecord>(tagId);
            tagInfo.set(tagId, tag);
        }

        return tag;
    }

    const fetchTags = (p: PostRecord) => Promise.all(p.tags.map(fetchTag));

    function postCollectionSubscriber(e: RecordSubscription<Record>) {
        // Convert the Record into a PostRecord by changing the prototype
        const record: PostRecord = Object.setPrototypeOf(e.record, PostRecord);

        if (e.action === "create") {
            items = [...items, record];
            postsIndex.set(record.id, items.length - 1);

            fetchPoster(record);
            fetchTags(record);
        } else if (e.action === "update") {

        } else if (e.action === "delete") {

        }
    }

    onMount(() => {
        console.log("Mount called");
        let pbUnsubscribe = pb.collection(POST_COLLECTION_KEY).subscribe("*", postCollectionSubscriber);
        
        return () => {
            console.log("Unsubscribe function called");
            pbUnsubscribe.then(f => f());
        }
    });
</script>

{#each items as post (post.id)}
    <Post title={post.title}
          content={post.content}
          created={new Date(post.created)}
          poster={fetchPoster(post)}
          tags={fetchTags(post)}/>
{:else}
    <div class="alert alert-info">No posts yet.</div>
{/each}