export type ValueOf<T> = T extends { [Property in keyof T]: infer V } ? V : never;

/** Like keyof, but only selects keys with a matching type. */
export type TypedKeyOf<T, K> = {[X in keyof T]-?: T[X] extends K ? X : never}[keyof T];

export type Iteratee<T, V> = ((obj: T) => V) | TypedKeyOf<T, V>;
export type ComparatorIteratee<T> = Iteratee<T, -1 | 0 | 1>;

export function normalizeIteratee<T, V>(iteratee: Iteratee<T, V>): (o: T) => V {
    if (typeof iteratee !== "function") {
        // Replace iteratee with key function.
        // Use a cast because the type-checker isn't able to understand that TypedKeyOf only selects keys with type V
        const key = iteratee;
        return (o: T) => o[key] as V;
    }

    return iteratee;
}

/**
 * Performs a binary search on a sorted array to find the index the item, or where the item should be inserted to maintain the sorted property.
 * @param sortedArray A sorted array. 
 * @param itemToInsert The item to be inserted into the array.
 * @param iteratee Either a function that takes an item from the array and returns a comparable value, or a key in the object whose value is used for comparison.
 * @returns A number in the range [0, sortedArray.length].
 */
export function binarySearch<T, V>(sortedArray: ArrayLike<T>, itemToInsert: T, iteratee: Iteratee<T, V>): number {
    iteratee = normalizeIteratee(iteratee);
    
    const value = iteratee(itemToInsert);
    let low = 0, high = sortedArray.length;

    while (low < high) {
        const mid = Math.floor((high + low) / 2),
              computed = iteratee(sortedArray[mid]);
        
        if (computed < value) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }

    return Math.min(high, Number.MAX_SAFE_INTEGER);
}