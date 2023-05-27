<script lang="ts">
    import "../app.css";
	import UserInfo from "../components/UserInfo.svelte";
</script>

<div class="sm:container sm:mx-auto">
    <header class="sm:my-4">
        <nav class="navbar sm:rounded-box sm:border border-b shadow-sm bg-base-100">
            <div class="flex-grow">
                <a class="btn btn-ghost" href="/">
                    <h1 class="normal-case text-lg font-semibold">Parchment</h1>
                </a>
            </div>
            <div class="flex-shrink">
                <UserInfo />
            </div>
        </nav>
    </header>

    <slot />
</div>