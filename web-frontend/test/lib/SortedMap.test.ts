import { describe, it, expect } from "vitest";
import SortedMap from "../../src/lib/SortedMap";

interface TestObject {
    order: number
}

describe("SortedMap", () => {
    it("inserts items", () => {
        const sut = new SortedMap<string, TestObject, number>("order");

        sut.set("ace", {order: 5});
        expect(sut.get("ace")).toStrictEqual({order: 5})
    });

    it("insert and override items", () => {
        const sut = new SortedMap<string, TestObject, number>("order");

        sut.set("ace", {order: 1});
        expect(sut.get("ace")!.order).toBe(1);

        sut.setOverride("ace", {order: 5});
        expect(sut.get("ace")!.order).toBe(5);
    })

    it("re-orders when an item is overriden", () => {
        const sut = new SortedMap<string, TestObject, number>("order");
        sut.set("ace", {order: 1});
        sut.set("bar", {order: 2});
        sut.set("club", {order: 3});
        expect([...sut]).toStrictEqual([
            ["ace", {order: 1}],
            ["bar", {order: 2}],
            ["club", {order: 3}]
        ]);

        sut.setOverride("ace", {order: 5});
        expect([...sut]).toStrictEqual([
            ["bar",  {order: 2}],
            ["club", {order: 3}],
            ["ace",  {order: 5}]
        ]);
    })

    it("inserts items in the correct order", () => {
        const sut = new SortedMap<string, TestObject, number>("order");

        sut.set("ace",   {order: 5});
        sut.set("bar",   {order: 2});
        sut.set("club",  {order: 7});
        sut.set("done",  {order: 3});
        sut.set("earth", {order: 6});
        sut.set("fox",   {order: 1});
        sut.set("game",  {order: 8});
        sut.set("hill",  {order: 4});

        const actual = [...sut];
        expect(actual).toStrictEqual([
            ["fox",   {order: 1}],
            ["bar",   {order: 2}],
            ["done",  {order: 3}],
            ["hill",  {order: 4}],
            ["ace",   {order: 5}],
            ["earth", {order: 6}],
            ["club",  {order: 7}],
            ["game",  {order: 8}]
        ]);
    });
});