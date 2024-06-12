import { bench, describe } from "vitest";
import { getImplementations } from "./getImplementations";

describe("Create & Destroy an Entity", (count) => {
    for (const implementation of getImplementations()) {
        bench(
            implementation.name,
            () => {
                const entity = implementation.createEntity();
                implementation.destroyEntity(entity);
            },
            {
                async setup() {
                    await implementation.setup();
                },
                teardown: implementation.teardown,
                warmupIterations: 500,
            }
        );
    }
});
