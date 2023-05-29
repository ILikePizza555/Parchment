<script lang="ts">
    import { pb } from "$lib/pocketbase";
    import type { PageData } from "./$types";
    import debug from "debug";
	import { onDestroy } from "svelte";
	import type { PostRecord } from "$lib/types";
	import Post from "../components/Post.svelte";

    export let data: PageData;
    let {postsIndex, items} = data;

    const log = debug("app:routes:page");

    /*
    let pb_unsubscribe = pb.collection("posts").subscribe<PostRecord>("*", (e) => {
        log("Event:", e);

        if (e.action === "create" || e.action === "update") {
            posts.set(e.record.id, e.record);
        } else if (e.action === "delete") {
            posts.delete(e.record.id);
        }

        posts = posts; // Reactivity
    });

    onDestroy(() => {
        pb_unsubscribe
    })*/
</script>

{#each items as post (post.id)}
    {console.log(post), ""}
    <Post title={post.title}
          content={post.content}
          created={new Date(post.created)}
          poster={post.expand.original_poster}
          tags={post.expand.tags}/>
{:else}
    <div class="alert alert-info">No posts yet.</div>
{/each}