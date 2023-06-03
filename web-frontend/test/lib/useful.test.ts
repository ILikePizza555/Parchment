import { describe, it, expect } from "vitest";
import { binarySearch } from "../../src/lib/useful";

describe("binarySearch", () => {
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
});