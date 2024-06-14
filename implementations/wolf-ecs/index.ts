import { ECS, types } from "wolf-ecs";
import { ECSBenchmarkHarness } from "../../ECSBenchmarkHarness";
import { name, version } from "../../node_modules/wolf-ecs/package.json";
import { createMovementSystem } from "./Systems/createMovementSystem";

class WolfECSImplementation extends ECSBenchmarkHarness<ECS, number> {
    get name(): string {
        return `${name} v.${version}`;
    }

    private world!: ECS;
    private position!: any;
    private velocity!: any;
    private movementSystem!: () => void;

    setup(): ECS | Promise<ECS> {
        const world = (this.world = new ECS(1e6));

        this.position = world.defineComponent({ x: types.f32, y: types.f32 });
        this.velocity = world.defineComponent({
            dx: types.f32,
            dy: types.f32,
        });

        const query = world.createQuery(this.position, this.velocity);

        this.movementSystem = createMovementSystem(
            query,
            this.position,
            this.velocity
        );

        return world;
    }

    teardown(): void | Promise<void> | undefined {
        this.position = null;
        this.velocity = null;
    }

    createEntity(): number {
        return this.world.createEntity();
    }

    destroyEntity(entity: number): void {
        this.world.destroyEntity(entity);
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
        const { position, velocity } = this;

        return [
            position.x[entity],
            position.y[entity],
            velocity.dx[entity],
            velocity.dy[entity],
        ];
    }

    tick(): void {
        this.movementSystem();
    }
}

const implementation = new WolfECSImplementation();

export default implementation;
