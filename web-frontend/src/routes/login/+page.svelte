<script lang="ts">
    import { applyAction, enhance } from "$app/forms";
    import { pb } from "$lib/pocketbase";
</script>

<h1>Log In</h1>
<form method="POST">
    <div><input type="email" name="email" placeholder="Email"/></div>
    <div><input type="password" name="password" placeholder="Password" /></div>
    <input type="submit" />
</form>