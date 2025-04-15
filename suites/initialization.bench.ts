import { bench, describe } from "vitest";
import { getBenchmarkImplementations } from "./getImplementations";

describe("Initialization", () => {
    for (const implementation of getBenchmarkImplementations()) {
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
