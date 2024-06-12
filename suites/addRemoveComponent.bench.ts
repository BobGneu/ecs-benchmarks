import { bench, describe } from "vitest";
import { getImplementations } from "./getImplementations";

describe("Add & Remove Component", () => {
    let entity: any;

    for (const implementation of getImplementations()) {
        bench(
            implementation.name,
            () => {
                implementation.addComponents(entity);
                implementation.removeComponents(entity);
            },
            {
                async setup() {
                    await implementation.setup();
                    entity = implementation.createEntity();
                },
                teardown() {
                    implementation.destroyEntity(entity);
                },
                warmupIterations: 500,
                warmupTime: 2000,
            }
        );
    }
});
