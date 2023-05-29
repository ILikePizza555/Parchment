<script lang="ts">
	import type { TagRecord, UserRecord } from "$lib/types";
	import type { Record } from "pocketbase";

    export let title: string | undefined;
    export let content: string;
    export let created: Date;
    export let poster: UserRecord;
    export let tags: TagRecord[];
</script>

<div class="my-12">
    <article class="prose mx-auto border shadow-md rounded-box divide-y [&>*]:p-4">
        <header class="flex">
            <div class="avatar">
                <div class="w-14 rounded-md">
                    <img class="m-0" src={poster.avatar || "https://placehold.co/48x48" } alt="User Avatar"/>
                </div>
            </div>
            <div class="ml-4">
                <div class="font-bold">{poster.username}</div>
                <time class="text-sm font-light">{created.toLocaleString()}</time>
            </div>
        </header>
        <div>
            {#if title}
                <h1>{title}</h1>
            {/if}
            {@html content}
        </div>
        <footer>
            {#each tags as tag}
                <span>#{tag.name}</span>
            {/each}
        </footer>
    </article>
</div>