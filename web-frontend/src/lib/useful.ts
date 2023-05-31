export type ValueOf<T> = T extends { [Property in keyof T]: infer V } ? V : never;

/** Like keyof, but only selects keys with a matching type. */
export type TypedKeyOf<T, K> = {[X in keyof T]-?: T[X] extends K ? X : never}[keyof T];

/**
 * Performs a binary search on a sorted array to find the index of where the item should be inserted in the array in order to
 * maintain the sort. 
 * @param sortedArray A sorted array. 
 * @param itemToInsert The item to be inserted into the array.
 * @param iteratee A function that takes an item from the array and returns a comparable value. 
 * @returns A number in the range [0, sortedArray.length].
 */
export function findInsertIndexBy<T, V>(sortedArray: ArrayLike<T>, itemToInsert: T, iteratee: ((obj: T) => V) | TypedKeyOf<T, V>): number {
    if (typeof iteratee !== "function") {
        const key = iteratee;
        // Replace iteratee with key function.
        // Use a cast because the type-checker isn't able to understand that TypedKeyOf only selects keys with type V
        iteratee = (o: T) => o[key] as V;
    }
    
    const value = iteratee(itemToInsert);
    let low = 1, high = sortedArray.length - 1;

    while (low < high) {
        const mid = Math.floor((high - low) / 2),
              computed = iteratee(sortedArray[mid]);
        
        if (computed < value) {
            low = mid;
        } else {
            high = mid;
        }
    }

    return Math.min(high, Number.MAX_SAFE_INTEGER);
}