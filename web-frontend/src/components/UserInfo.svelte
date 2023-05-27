<script lang="ts">
    import { pb, currentUserModel } from "$lib/pocketbase";

    export let placeholderAvatar = "https://placehold.co/40x40";
</script>

<div>
{#if $currentUserModel}
    <div class="dropdown dropdown-end">
        <button tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
                <img src={$currentUserModel?.avatar || placeholderAvatar} alt="User avatar">
            </div>
        </button>
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <ul tabindex="0" class="dropdown-content menu menu-compact bg-base-100 rounded-box shadow mt-3 p-2">
            <li>
                <form method="POST" action="/logout">
                    <button type="submit">Logout</button>
                </form>
            </li>
        </ul>
    </div>
{:else}
    <div class="dropdown dropdown-end">
        <button tabindex="0" class="btn btn-ghost">Login</button>
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <div tabindex="0" class="dropdown-content card card-compact shadow mt-3 p-2">
            <form method="POST" action="/login" class="flex-col">
                <label class="input-group mb-2">
                    <span>Email</span>
                    <input type="email" name="email" class="input input-bordered w-full"/>
                </label>
                <label class="input-group mb-2">
                    <span>Password</span>
                    <input type="password" name="password" class="input input-bordered" />
                </label>
                <button type="submit" class="btn">Login</button>
            </form>
        </div>
    </div>
{/if}
</div>