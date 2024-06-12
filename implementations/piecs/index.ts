import { createEntitySystem, World } from "piecs";
import { ECSBenchmarkHarness } from "../../ECSBenchmarkHarness";
import { createPositionComponent } from "./Components/Position";
import { createVelocityComponent } from "./Components/Velocity";
import { createMovementSystem } from "./Systems/createMovementSystem";

class PiECSImplementation extends ECSBenchmarkHarness<World, number> {
    get name(): string {
        return "piecs";
    }

    private world!: World;
    private position: any;
    private velocity: any;

    setup(): World | Promise<World> {
        const world = (this.world = new World());

        this.position = createPositionComponent(world);
        this.velocity = createVelocityComponent(world);

        world
            .registerSystem(
                createEntitySystem(
                    createMovementSystem(this.position, this.velocity),
                    (q) => q.every(this.position).every(this.velocity)
                )
            )
            .initialize();

        return world;
    }

    teardown(): void | Promise<void> | undefined {}

    createEntity(): number {
        return this.world.createEntity();
    }

    destroyEntity(entity: number): void {
        this.world.deleteEntity(entity);
    }

    addComponents(entity: number): void {
        this.world.addComponent(entity, this.position);
        this.world.addComponent(entity, this.velocity);

        this.position.x[entity] = 0;
        this.position.y[entity] = 0;

        this.velocity.dx[entity] = 1;
        this.velocity.dy[entity] = 1;
    }

    removeComponents(entity: number): void {
        this.world.removeComponent(entity, this.position);
        this.world.removeComponent(entity, this.velocity);
    }

    getComponents(entity: number): [number, number, number, number] {
        return [
            this.position.x[entity],
            this.position.y[entity],
            this.velocity.dx[entity],
            this.velocity.dy[entity],
        ];
    }

    tick(): void {
        this.world.update();
    }
}

const implementation = new PiECSImplementation();

export default implementation;
