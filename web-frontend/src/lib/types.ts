import { Record as PBRecord } from "pocketbase";

type JsonObject = { [key: string]: string };

export class PostRecord<E extends Record<keyof E, PBRecord | Array<PBRecord>>> extends PBRecord {
    declare title:     string;
    declare content:   string;
    declare expand:    E; // Don't override the `expand` type, just allow constraining it.

    get createdDate(): Date {
        return new Date(this.created);
    }
}

export interface UserRecord extends PBRecord {
    username:  string;
    email:     string;
    avatar:    string;
}