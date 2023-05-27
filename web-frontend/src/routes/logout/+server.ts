import { redirect } from "@sveltejs/kit"

export async function POST({locals, cookies}) {
    locals.pb.authStore.clear();
    locals.user = null;
    cookies.delete("pb_auth");
    
    throw redirect(303, "/")
}