import { bench, describe } from "vitest";
import { getBenchmarkImplementations } from "./getImplementations";

interface Bracket {
    count: number;
    relevant: number;
}

describe.each([
    { count: 1, relevant: 1 },
    { count: 100, relevant: 100 },
    { count: 1000, relevant: 1000 },
    { count: 10000, relevant: 10000 },
])(
    "World Tick with $count Entities, $relevant are relevant",
    ({ count, relevant }: Bracket) => {
        for (const implementation of getBenchmarkImplementations()) {
            let entities: Array<any>;

            bench(
                implementation.name,
                async () => {
                    try {
                        await implementation.tick();
                    } catch (e) {
                        console.error(e);
                    }
                },
                {
                    setup() {
                        implementation.setup();
                        entities = new Array(count);

                        for (let ndx = 0; ndx < count; ndx++) {
                            entities[ndx] = implementation.createEntity();

                            if (ndx <= relevant) {
                                implementation.addComponents(entities[ndx]);
                            }
                        }
                    },
                    teardown() {
                        for (const entity of entities) {
                            implementation.destroyEntity(entity);
                        }

                        implementation.world = null;

                        entities.length = 0;
                    },
                    warmupTime: 2000,
                }
            );
        }
    }
);
