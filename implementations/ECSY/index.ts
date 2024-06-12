import { Entity, World } from "ecsy";
import { ECSBenchmarkHarness } from "../../ECSBenchmarkHarness";
import { Position } from "./Components/Position";
import { Velocity } from "./Components/Velocity";
import { MovementSystem } from "./Systems/MovementSystem";

class ECSYImplementation extends ECSBenchmarkHarness<World, Entity> {
    get name(): string {
        return "ECSY";
    }

    private world!: World;

    setup() {
        const world = (this.world = new World());

        world.registerComponent(Position).registerComponent(Velocity);
        world.registerSystem(MovementSystem);

        return world;
    }

    teardown(): void | Promise<void> | undefined {
        /* TODO: document why this method 'teardown' is empty */
    }

    createEntity() {
        return this.world.createEntity();
    }

    destroyEntity(entity: Entity): void {
        entity.remove();
    }

    addComponents(entity: Entity): void {
        entity.addComponent(Position, { x: 0, y: 0 });
        entity.addComponent(Velocity, { dx: 1, dy: 1 });
    }

    removeComponents(entity: Entity): void {
        entity.removeComponent(Position);
        entity.removeComponent(Velocity);
    }

    getComponents(entity: Entity): [number, number, number, number] {
        const positionComponent = entity.getComponent(Position)!;
        const velocityComponent = entity.getComponent(Velocity)!;

        return [
            positionComponent?.x,
            positionComponent?.y,
            velocityComponent?.dx,
            velocityComponent?.dy,
        ];
    }

    tick(): void {
        this.world.execute();
    }
}

const implementation = new ECSYImplementation();

export default implementation;
