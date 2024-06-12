import { World } from "uecs";
import { ECSBenchmarkHarness } from "../../ECSBenchmarkHarness";
import { Position } from "./Components/Position";
import { Velocity } from "./Components/Velocity";
import { MovementSystem } from "./Systems/MovementSystem";

class UECSImplementation extends ECSBenchmarkHarness<World, number> {
    get name(): string {
        return "uecs";
    }

    private world!: World;
    private movementSystem!: MovementSystem;

    setup(): World | Promise<World> {
        const world = (this.world = new World());
        this.movementSystem = new MovementSystem(world);

        return world;
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
        this.world.emplace(entity, new Position());
        this.world.emplace(entity, new Velocity());
    }

    removeComponents(entity: number): void {
        this.world.remove(entity, Position);
        this.world.remove(entity, Velocity);
    }

    getComponents(entity: number): [number, number, number, number] {
        const position = this.world.get(entity, Position)!;
        const velocity = this.world.get(entity, Velocity)!;

        return [position.x, position.y, velocity.dx, velocity.dy];
    }

    tick(): void {
        this.movementSystem.update();
    }
}

const implementation = new UECSImplementation();

export default implementation;
