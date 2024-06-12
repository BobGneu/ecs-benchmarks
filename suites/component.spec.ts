import { describe, expect, it } from "vitest";
import { getImplementations } from "./getImplementations";

describe("Component Behavior", () => {
    describe("should initialize the value of the Position component to <0, 0>", () => {
        it.each(getImplementations())("$name", async (implementation) => {
            await implementation.setup();

            const entity = implementation.createEntity();
            implementation.addComponents(entity);

            expect(implementation.getComponents(entity)).toEqual([
                0,
                0,
                expect.any(Number),
                expect.any(Number),
            ]);
        });
    });

    describe("should initialize the value of the Velocity component to <1, 1>", () => {
        it.each(getImplementations())("$name", async (implementation) => {
            await implementation.setup();

            const entity = implementation.createEntity();
            implementation.addComponents(entity);

            expect(implementation.getComponents(entity)).toEqual([
                expect.any(Number),
                expect.any(Number),
                1,
                1,
            ]);
        });
    });

    describe("should move the entity from <0, 0> to <5, 5> after 5 ticks", () => {
        it.each(getImplementations())("$name", async (implementation) => {
            await implementation.setup();

            const entity = implementation.createEntity();
            implementation.addComponents(entity);

            expect(implementation.getComponents(entity)).toEqual([0, 0, 1, 1]);

            implementation.tick();
            implementation.tick();
            implementation.tick();
            implementation.tick();
            implementation.tick();

            expect(implementation.getComponents(entity)).toEqual([5, 5, 1, 1]);
        });
    });
});
