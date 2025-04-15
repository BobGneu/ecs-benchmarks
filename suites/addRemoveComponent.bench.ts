import { bench, describe } from "vitest";
import {
    getBenchmarkImplementations
} from "./getImplementations";

describe("Add & Remove Component", () => {
    let entity: any;

    for (const implementation of getBenchmarkImplementations()) {
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
