import { redirect, error } from "@sveltejs/kit"
import type { Actions } from "./$types"

const EMAIL_KEY = "email";
const PASSWORD_KEY = "password";

export const actions = {
    default:async ({ locals, request }) => {
        const formData = await request.formData();
        const email = formData.get(EMAIL_KEY)?.toString();
        const password = formData.get(PASSWORD_KEY)?.toString();

        if(!email) {
            throw error(400, "Invalid or missing email");
        }

        if(!password) {
            throw error(400, "Invalid or missing password");
        }

        try {
            await locals.pb
                .collection("users")
                .authWithPassword(email, password);
        } catch (e) {
            console.error(e);
            throw e;
        }

        throw redirect(303, "/");
    }
} satisfies Actions;