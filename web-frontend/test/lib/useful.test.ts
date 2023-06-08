import { describe, it, expect } from "vitest";
import { binarySearch } from "../../src/lib/useful";

describe("binarySearch", () => {
    it("outputs the length of the array when items should be appended", () => {
        const sortedArray = [0, 1, 2];

        expect(binarySearch(sortedArray, 3, (o: number) => o)).toBe(3);
    });

    it("returns zero when prepending to the array", () => {
        const sortedArray = [4];
        expect(binarySearch(sortedArray, 2, (o: number) => o)).toBe(0);
    })

    it("locates where an item should be inserted", () => {
        const sortedArray = [1, 3, 4, 5, 6, 7];

        const actual = binarySearch(sortedArray, 2, (o: number) => o);
        expect(actual === 1);
    });

    it("locates the index of an item", () => {
        const sortedArray = [0, 1, 2, 3, 4];

        const actual = binarySearch(sortedArray, 3, (o: number) => o);
        expect(actual === 3);
    });

    it("uses iteratee for comparison", () => {
        const sortedArray = [
            {key: 1}, {key: 2}, {key: 5}, {key: 6}, {key: 7}, {key: 9}, {key: 10}
        ];

        const actual = binarySearch(sortedArray, {key: 8}, "key");
        expect(actual === 5);
    });

    it("bounces insertion", () => {
        let a: number[] = [];

        let insertValue = 5;
        let insertIndex = binarySearch(a, insertValue, (o: number) => o);
        expect(insertIndex).toBe(0);
        a.splice(insertIndex, 0, insertValue); // [5]

        insertValue = 2
        insertIndex = binarySearch(a, insertValue, (o: number) => o);
        expect(insertIndex).toBe(0);
        a.splice(insertIndex, 0, insertValue); // [2, 5]

        insertValue = 7
        insertIndex = binarySearch(a, insertValue, (o: number) => o);
        expect(insertIndex).toBe(2);
        a.splice(insertIndex, 0, insertValue); // [2, 5, 7]

        insertValue = 3
        insertIndex = binarySearch(a, insertValue, (o: number) => o);
        expect(insertIndex).toBe(1);
        a.splice(insertIndex, 0, insertValue); // [2, 3, 5, 7]
    })
});