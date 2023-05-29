import { Record } from "pocketbase";

type JsonObject = { [key: string]: string };

export interface RecordExpand {
    [key: string]: Record | Array<Record>
}

export class PostRecord<E extends RecordExpand = {}> extends Record {
    declare title:     string;
    declare content:   string;
    declare expand:    E; // Don't override the `expand` type, just allow constraining it.

    get createdDate(): Date {
        return new Date(this.created);
    }
}

export interface UserRecord extends Record {
    username:  string;
    email:     string;
    avatar:    string;
}