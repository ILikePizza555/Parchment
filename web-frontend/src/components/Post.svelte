<script lang="ts">
	import type { TagRecord, UserRecord } from "$lib/types";
	import type { Record } from "pocketbase";

    export let title: string | undefined;
    export let content: string;
    export let created: Date;
    export let poster: Promise<UserRecord>;
    export let tags: Promise<TagRecord[]>;
</script>

<div class="my-12">
    <article class="prose mx-auto border shadow-md rounded-box divide-y [&>*]:p-4 overflow-clip">
        <header class="flex bg-orange-100 dark:bg-slate-800">
            {#await poster}
                <div>Loading</div>
            {:then poster} 
                <div class="avatar">
                    <div class="w-14 rounded-md">
                        <img class="m-0" src={poster.avatar || "https://placehold.co/48x48" } alt="User Avatar"/>
                    </div>
                </div>
                <div class="ml-4">
                    <div class="font-bold">{poster.username}</div>
                    <time class="text-sm font-light">{created.toLocaleString()}</time>
                </div>
            {/await}
        </header>
        <div>
            {#if title}
                <h1>{title}</h1>
            {/if}
            {@html content}
        </div>
        <footer class="bg-orange-100 dark:bg-slate-800">
            {#await tags}
                <div>Loading</div>
            {:then tags}
                {#each tags as tag}
                    <span>#{tag.name}</span>
                {/each}
            {/await}
        </footer>
    </article>
</div>