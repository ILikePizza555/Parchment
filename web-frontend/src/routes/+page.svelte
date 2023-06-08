<script lang="ts">
    import { pb } from "$lib/pocketbase";
    import type { PageData } from "./$types";
	import { onMount } from "svelte";
	import { PostRecord, type TagRecord, type UserRecord } from "$lib/types";
	import Post from "../components/Post.svelte";
	import type { Record, RecordSubscription } from "pocketbase";

    export let data: PageData;
    let {postCollection, userCollection, tagCollection} = data;
    let postArray = [...postCollection.values()]; // I don't like this but svelte only lets you iterate over ArrayLikes

    const USER_COLLECTION_KEY = "users";
    const POST_COLLECTION_KEY = "posts";
    const TAG_COLLECTION_KEY = "tags";

    /** Gets the user specified in the post. If it's not stored locally, get it from the database.  */
    async function fetchUser(p: PostRecord): Promise<UserRecord> {
        let user = userCollection.get(p.original_poster);

        if (!user) {
            user = await pb.collection(USER_COLLECTION_KEY).getOne<UserRecord>(p.original_poster);
            userCollection.set(user.id, user);
        }

        return user;
    }

    async function fetchTag(tagId: string): Promise<TagRecord> {
        let tag = tagCollection.get(tagId);

        if (!tag) {
            tag = await pb.collection(TAG_COLLECTION_KEY).getOne<TagRecord>(tagId);
            tagCollection.set(tagId, tag);
        }

        return tag;
    }

    const fetchTags = (p: PostRecord) => Promise.all(p.tags.map(fetchTag));

    function postCollectionSubscriber(e: RecordSubscription<Record>) {
        // Convert the Record into a PostRecord by changing the prototype
        const record: PostRecord = Object.setPrototypeOf(e.record, PostRecord);

        if (e.action === "create") {
            postCollection.set(record.id, record)

            // Ensure the user is in the local store
            fetchUser(record);
            fetchTags(record);
        } else if (e.action === "update") {
            postCollection.setOverride(record.id, record);
        } else if (e.action === "delete") {
            postCollection.delete(record.id);
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

{#each postArray as post (post.id)}
    <Post title={post.title}
          content={post.content}
          created={new Date(post.created)}
          poster={fetchUser(post)}
          tags={fetchTags(post)}/>
{:else}
    <div class="alert alert-info">No posts yet.</div>
{/each}