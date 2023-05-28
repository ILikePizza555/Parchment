import type { Record } from "pocketbase";

export interface PostRecord extends Record {
    original_poster: any,
    tags: any,
    content: string,
    title: string
}