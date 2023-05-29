<script lang="ts">
    export let title: string | undefined;
    export let content: string;
    export let created: Date;
</script>

<div class="my-16">
    <article class="prose mx-auto border shadow-md p-4 rounded-box">
        {#if title}
            <h1>{title}</h1>
        {/if}
        {@html content}
    </article>
</div>