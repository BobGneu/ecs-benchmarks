import { bench, describe } from "vitest";
import { getBenchmarkImplementations } from "./getImplementations";

describe("World Tick without entities", (count) => {
    let world: any;
    let entity: any;

    for (const implementation of Object.values(getBenchmarkImplementations)) {
        bench(
            implementation.name,
            async () => {
                await implementation.tick();
            },
            {
                async setup() {
                    world = await implementation.setup();
                    entity = new Array(count);

                    entity = implementation.createEntity();

                    implementation.addComponents(entity);
                },
                async teardown() {
                    implementation.destroyEntity(entity);

                    entity = null;

                    implementation.world = null;

                    await implementation.teardown?.();
                },
                warmupIterations: 1,
                warmupTime: 2000,
            }
        );
    }
});
