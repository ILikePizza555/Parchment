<script lang="ts">
    import { pb } from "$lib/pocketbase";
    import type { PageData } from "./$types";
    import debug from "debug";
	import { onDestroy } from "svelte";
	import type { PostRecord } from "./types";

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
    <div>
        <article class="prose mx-auto">
            <h1>{post.title}</h1>
            {@html post.content}
        </article>
    </div>
{:else}
    <div class="alert alert-info">No posts yet.</div>
{/each}