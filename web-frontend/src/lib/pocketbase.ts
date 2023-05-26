import PocketBase from 'pocketbase';
import { writable } from 'svelte/store'

const PUBLIC_POCKETBASE_URL = "http://127.0.0.1:8090";
export const pb = new PocketBase(PUBLIC_POCKETBASE_URL);

export const currentUserModel = writable(pb.authStore.model);