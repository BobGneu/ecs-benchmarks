import { createWorld, Entity, toComponent, World } from "@javelin/ecs";
import { ECSBenchmarkHarness } from "../../ECSBenchmarkHarness";
import { Position } from "./Components/Position";
import { Velocity } from "./Components/Velocity";
import { createMovementSystem } from "./Systems/createMovementSystem";

class JavelinImplementation extends ECSBenchmarkHarness<World, Entity> {
    get name(): string {
        return "javelin-ecs";
    }

    private world!: World;

    setup(): World | Promise<World> {
        this.world = createWorld({});

        const movementSystem = createMovementSystem(this.world);
        this.world.addSystem(movementSystem);

        return this.world;
    }

    teardown(): void | Promise<void> | undefined {
        /* TODO: document why this method 'teardown' is empty */
    }

    createEntity(): number {
        return this.world.create();
    }

    destroyEntity(entity: number): void {
        this.world.destroy(entity);
    }

    addComponents(entity: number): void {
        this.world.attach(entity, toComponent({ x: 0, y: 0 }, Position));
        this.world.attach(entity, toComponent({ dx: 1, dy: 1 }, Velocity));
    }

    removeComponents(entity: number): void {
        this.world.detach(entity, Position, Velocity);
    }

    getComponents(entity: number): [number, number, number, number] {
        const position = this.world.tryGet(entity, Position);
        const velocity = this.world.tryGet(entity, Velocity);

        return [position?.x, position?.y, velocity?.dx, velocity?.dy];
    }

    tick(): void {
        this.world.step({});
    }
}

const implementation = new JavelinImplementation();

export default implementation;
