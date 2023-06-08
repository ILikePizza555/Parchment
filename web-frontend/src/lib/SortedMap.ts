import { normalizeIteratee, type Iteratee, binarySearch } from "./useful";

/**
 * Defines a data structure that enables lookups in O(1) time, while also preserving a specified order of elements.
 * 
 * SortedMap is instatiated with two functions: `iteratee`, which defines the sort order of the elements, 
 * and `keyFn` which defines the key of the elements.
 * 
 * Note that it is assumed that different objects will have unique keys. That is to say if `keyFn(a) === keyFn(b)`, then `a === b`.
 */
export default class SortedMap<T, S, K = string> implements Iterable<T> {
    
    private sortedArray: K[] = [];
    private itemIndex: Map<K, T> = new Map();

    private iteratee: (o: T) => S;
    private keyFn: (o: T) => K;

    constructor(iteratee: Iteratee<T, S>, keyFn: Iteratee<T, K>) {
        this.iteratee = normalizeIteratee(iteratee);
        this.keyFn = normalizeIteratee(keyFn);
    }

    public insertOverride(item: T) {
        const key = this.keyFn(item);
        const insertIndex = binarySearch(this.sortedArray, key, this._iterateeWrapper(key, item));

        if (key !== this.sortedArray[insertIndex]) {
            // The key is unique, insert normally
            this._insertItem(insertIndex, key, item);
        } else {
            // The key already exists in the array. Just update the map.
            this.itemIndex.set(key, item);
        }
    }

    public insertDistinct(item: T) {
        const key = this.keyFn(item);
        if (this.has(key)) {
            throw new Error(`Cannot insert distinct: Item with key "${key}" already exists in collection.`);
        }

        const insertIndex = binarySearch(this.sortedArray, key, this._iterateeWrapper(key, item));
        this._insertItem(insertIndex, key, item);
    }

    public get(key: K): T | undefined {
        return this.itemIndex.get(key);
    }

    public has(key: K): boolean {
        return this.itemIndex.has(key);
    }

    public delete(key: K): boolean {
        if (!this.has(key)) {
            return false;
        }
        
        const item = this.get(key)!;
        const itemIndex = binarySearch(this.sortedArray, key, this._iterateeWrapper(key, item));
        
        this.sortedArray.splice(itemIndex, 1);
        this.itemIndex.delete(key);

        return true;
    }

    public* [Symbol.iterator](): Generator<T> {
        for (const key of this.sortedArray) {
            yield this.get(key)!;
        }
    }

    protected _iterateeWrapper(insertKey: K, insertItem: T): (searchKey: K) => S {
        return (searchKey: K) => this.iteratee(this._lookupItem(insertKey, insertItem, searchKey))
    }

    protected _insertItem(index: number, key: K, item: T) {
        this.sortedArray.splice(index, 0, key);
        this.itemIndex.set(key, item);
    }

    /**
     * Looks up the item by `searchKey` in the collection. If `searchKey` matches `insertKey` then, `insertItem` is returned.
     * This function is used as part of the insertion operations.
     * @param insertKey The key of the item currently being inserted. (The result of `this.keyFn(insertItem)`).
     * @param insertItem The item currently being inserted.
     * @param searchKey The key to lookup in the collection.
     * @returns Either an item from the collection or `insertItem`. 
     */
    protected _lookupItem(insertKey: K, insertItem: T, searchKey: K): T {
        let searchItem: T | undefined = undefined;
        if (searchKey === insertKey) {
            searchItem = insertItem;
        } else {
            searchItem = this.get(searchKey);
        }

        if (searchItem === undefined) {
            throw new Error(`sortedArray and itemIndex out of sync! (${searchKey} exists in array but not in index)`)
        }

        return searchItem;
    }
}