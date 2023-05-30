import { Record as PBRecord } from "pocketbase";

export type ExpandProp<E> = Record<keyof E, PBRecord | Array<PBRecord>>;

export class ExpandRecord<E extends ExpandProp<E> = {}> extends PBRecord {
    declare expand: E;
}

export class PostRecord<E extends ExpandProp<E> = {}> extends ExpandRecord<E>  {
    declare title:              string;
    declare content:            string;
    declare original_poster:    string;
    declare tags:               string[];

    get createdDate(): Date {
        return new Date(this.created);
    }
}

export interface UserRecord<E extends ExpandProp<E> = {}> extends ExpandRecord<E> {
    username:  string;
    email:     string;
    avatar:    string;
}

export interface TagRecord<E extends ExpandProp<E> = {}> extends ExpandRecord<E> {
    name: string;
}