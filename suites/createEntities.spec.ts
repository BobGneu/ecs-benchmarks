import { afterEach } from "node:test";
import { beforeEach, describe, expect, it } from "vitest";
import { getImplementations } from "./getImplementations";

describe("Component Behavior", () => {
    getImplementations().forEach((implementation) => {
        beforeEach(() => {
            implementation.setup();
        });

        afterEach(() => {
            implementation.teardown();
        });

        describe(implementation.name, () => {
            it("should be able to create 1 entity and tick", () => {
                const entity = implementation.createEntity();

                implementation.addComponents(entity);

                implementation.tick();
            });

            it.each([100, 1000, 10000])(
                "should be able to create %d entities",
                (count) => {
                    const entities = new Set();

                    for (let ndx = 0; ndx < count; ndx++) {
                        const entity = implementation.createEntity();

                        implementation.addComponents(entity);

                        entities.add(entity);
                    }

                    expect(entities).toHaveLength(count);

                    implementation.tick();
                }
            );
        });
    });
});
