<script lang="ts">
    import "../app.css";
	import UserInfo from "../components/UserInfo.svelte";
</script>

<div class="sm:container sm:mx-auto">
    <header class="sm:my-4">
        <nav class="navbar sm:rounded-box sm:border border-b shadow-sm bg-base-100">
            <h1 class="flex-1 text-lg">Parchment</h1>
            <div class="flex-none">
                <UserInfo />
            </div>
        </nav>
    </header>

    <slot />
</div>