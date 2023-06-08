import { normalizeIteratee, type Iteratee, binarySearch } from "./useful";

/**
 * Defines a data structure that enables lookups in O(1) time, while also preserving a specified order of elements.
 * 
 */
export default class SortedMap<K, T, S> implements Map<K, T> {
    
    private sortedArray: K[] = [];
    private itemIndex: Map<K, T> = new Map();

    private iteratee: (o: T) => S;

    constructor(iteratee: Iteratee<T, S>,) {
        this.iteratee = normalizeIteratee(iteratee);
    }

    public get size(): number {
        return this.sortedArray.length;
    }

    public get [Symbol.toStringTag](): string {
        const kvPairs = this.sortedArray.map(key => {
            return `${key}: ${this.get(key)}`;
        });

        return `SortedMap size=${this.size} {${kvPairs.join(", ")}}`;
    }

    public insertOverride(key: K, item: T) {
        const insertIndex = binarySearch(this.sortedArray, key, this._iterateeWrapper(key, item));

        if (key !== this.sortedArray[insertIndex]) {
            // The key is unique, insert normally
            this._insertItem(insertIndex, key, item);
        } else {
            // The key already exists in the array. Just update the map.
            this.itemIndex.set(key, item);
        }
    }

    public insertDistinct(key: K, item: T) {
        if (this.has(key)) {
            throw new Error(`Cannot insert distinct: Item with key "${key}" already exists in collection.`);
        }

        const insertIndex = binarySearch(this.sortedArray, key, this._iterateeWrapper(key, item));
        this._insertItem(insertIndex, key, item);
    }

    public get(key: K): T | undefined {
        return this.itemIndex.get(key);
    }

    public set(key: K, item: T): this {
        this.insertOverride(key, item);
        return this;
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

    public clear(): void {
        this.itemIndex.clear();
        this.sortedArray.length = 0;
    }

    public [Symbol.iterator](): IterableIterator<[K, T]> {
        return this.entries();
    }

    public keys(): IterableIterator<K> {
        return this.sortedArray[Symbol.iterator]();
    }

    public values(): IterableIterator<T> {
        const arrayIter = this.sortedArray[Symbol.iterator]();
        const self = this;
        return {
            [Symbol.iterator]() {
                return this;
            },
            next() {
                const v = arrayIter.next();
                if (v.done) {
                    return v;
                }
                return {
                    value: self.get(v.value)!, // `v.value` must exist in the table because it was obtained from the sortedArray
                    done: false
                };
            }
        }
    }

    public entries(): IterableIterator<[K, T]> {
        const arrayIter = this.sortedArray[Symbol.iterator]();
        const self = this;
        return {
            [Symbol.iterator]() {
                return this;
            },
            next() {
                const v = arrayIter.next();
                if (v.done) {
                    return v;
                }
                return {
                    value: [v.value, self.get(v.value)!],
                    done: false
                }
            }
        }
    }

    public forEach(callbackfn: (value: T, key: K, map: SortedMap<K, T, S>) => void, thisArg?: any): void {
        for (const key of this.sortedArray) {
            const value = this.get(key)!;
            callbackfn.call(thisArg, value, key, this);
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