import { currentUserModel, pb } from "$lib/pocketbase";

pb.authStore.loadFromCookie(document.cookie);
pb.authStore.onChange(() => {
    currentUserModel.set(pb.authStore.model);
    document.cookie = pb.authStore.exportToCookie({ httpOnly: false })
});