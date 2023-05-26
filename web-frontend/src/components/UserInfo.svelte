<script lang="ts">
    import { pb, currentUserModel } from "$lib/pocketbase";

    export let placeholderAvatar = "https://placehold.co/40x40";
</script>

<div>
{#if currentUserModel}
    <div class="dropdown dropdown-end">
        <button tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
                <img src={$currentUserModel?.avatar || placeholderAvatar} alt="User avatar">
            </div>
        </button>
        <ul class="dropdown-content menu menu-compact bg-base-100 rounded-box shadow mt-3 p-2">
            <li><a>Logout</a></li>
        </ul>
    </div>
{:else}
    <a class="btn btn-ghost">Login</a>
    <a class="btn btn-ghost">Register</a>
{/if}
</div>