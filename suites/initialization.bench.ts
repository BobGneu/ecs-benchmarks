import { bench, describe } from "vitest";
import { getImplementations } from "./getImplementations";

describe("Initialization", () => {
    for (const implementation of getImplementations()) {
        bench(
            implementation.name,
            async () => {
                await implementation.setup();
            },
            {
                teardown: implementation.teardown,
                warmupIterations: 500,
            }
        );
    }
});
