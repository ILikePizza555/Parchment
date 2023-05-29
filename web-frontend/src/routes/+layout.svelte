<script lang="ts">
    import "../app.css";
	import UserInfo from "../components/UserInfo.svelte";
</script>

<div class="sm:container sm:mx-auto">
    <header class="sm:mt-4 mb-8 sticky top-0 z-50">
        <nav class="navbar sm:rounded-box sm:border border-b shadow-lg bg-base-100">
            <div class="flex-grow">
                <a class="btn btn-ghost" href="/">
                    <h1 class="normal-case text-xl font-semibold">Parchment</h1>
                </a>
            </div>
            <div class="flex-shrink">
                <UserInfo />
            </div>
        </nav>
    </header>

    <slot />
</div>