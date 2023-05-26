<script lang="ts">
    import "../app.css";
    import { pb, currentUserModel } from "$lib/pocketbase";
	import UserInfo from "../components/UserInfo.svelte";
</script>

<div>
    <header>
        <nav class="navbar rounded-box shadow-xl bg-base-100">
            <h1 class="flex-1 text-lg">Parchment</h1>
            <div class="flex-none">
                <UserInfo />
            </div>
        </nav>
    </header>
</div>

<slot />