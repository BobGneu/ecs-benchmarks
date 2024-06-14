import { ECSBenchmarkHarness } from "../../ECSBenchmarkHarness";
import { Engine, Entity, World } from "../../vendored/geotic";
import { name, version } from "../../vendored/geotic/package.json";
import { Position } from "./Components/Position";
import { Velocity } from "./Components/Velocity";
import { MovementSystem } from "./Systems/MovementSystem";

class GeoticImplementation extends ECSBenchmarkHarness<World, Entity> {
    get name(): string {
        return `${name} - ${version}`;
    }

    private world!: World;
    private movementSystem!: MovementSystem;

    setup() {
        const engine = new Engine();

        engine.registerComponent(Position);
        engine.registerComponent(Velocity);

        const world = (this.world = engine.createWorld());

        this.movementSystem = new MovementSystem(world);

        return world;
    }

    teardown(): void | Promise<void> | undefined {
        /* TODO: document why this method 'teardown' is empty */
    }

    createEntity() {
        return this.world.createEntity();
    }

    destroyEntity(entity: Entity): void {
        entity.destroy();
    }

    addComponents(entity: Entity): void {
        entity.add(Position, { x: 0, y: 0 });
        entity.add(Velocity, { dx: 1, dy: 1 });
    }

    removeComponents(entity: Entity): void {
        entity.remove(Position);
        entity.remove(Velocity);
    }

    getComponents(entity: Entity): [number, number, number, number] {
        return [
            entity.position.x,
            entity.position.y,
            entity.velocity.dx,
            entity.velocity.dy,
        ];
    }

    tick(): void {
        this.movementSystem.update();
    }
}

const implementation = new GeoticImplementation();

export default implementation;
