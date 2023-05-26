<script lang="ts">
    import { pb, currentUserModel } from "$lib/pocketbase";
</script>

<nav>
    <a href="/login">login</a>
    {#if $currentUserModel}
        <span>Logged in as: {$currentUserModel.email}</span>
    {/if}
</nav>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
