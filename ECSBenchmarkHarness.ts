export abstract class ECSBenchmarkHarness<WORLD, ENTITY> {
    abstract get name(): string;

    abstract setup(): Promise<WORLD> | WORLD;
    abstract teardown(): Promise<void> | void | undefined;

    abstract createEntity(): ENTITY;
    abstract destroyEntity(entity: ENTITY): void;

    abstract addComponents(entity: ENTITY): void;
    abstract removeComponents(entity: ENTITY): void;
    abstract getComponents(entity: ENTITY): [number, number, number, number];

    abstract tick(): void;
}
