import { describe, expect, it } from "vitest";
import { getImplementations } from "./getImplementations";

describe("initialization", () => {
    describe("should define the world property", () => {
        it.each(getImplementations())("$name", async (implementation) => {
            expect(implementation).not.toHaveProperty("world");

            await implementation.setup();

            expect(implementation).toHaveProperty("world", expect.anything());
        });
    });

    describe("should leave the world ready for createEntity and destroyEntity", () => {
        it.each(getImplementations())("$name", async (implementation) => {
            expect.assertions(2);
            await implementation.setup();

            expect(() => {
                const entity = implementation.createEntity();

                expect(entity).not.toBeUndefined();

                implementation.destroyEntity(entity);
            }).not.toThrow();
        });
    });

    describe("should leave the world ready for addComponents and removeComponents", () => {
        it.each(getImplementations())("$name", (implementation) => {
            expect(async () => {
                await implementation.setup();
                const entity = implementation.createEntity();

                implementation.addComponents(entity);
                implementation.removeComponents(entity);
            }).not.toThrow();
        });
    });

    describe("should leave the world ready for tick", () => {
        it.each(getImplementations())("$name", async (implementation) => {
            await implementation.setup();

            expect(async () => {
                await implementation.tick();
            }).not.toThrow();
        });
    });
});
