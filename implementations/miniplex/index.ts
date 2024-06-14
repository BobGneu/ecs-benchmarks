import { World } from "miniplex";
import { ECSBenchmarkHarness } from "../../ECSBenchmarkHarness";
import { name, version } from "../../node_modules/miniplex/package.json";
import { createMovementSystem } from "./Systems/createMovementSystem";

type Entity = {
    position: { x: number; y: number };
    velocity: { dx: number; dy: number };
};

class MiniPlexImplementation extends ECSBenchmarkHarness<World, Entity> {
    get name(): string {
        return `${name} v.${version}`;
    }

    private world!: World;
    private movementSystem!: () => void;

    setup(): World<any> | Promise<World<any>> {
        this.world = new World();
        this.movementSystem = createMovementSystem(this.world);

        return this.world;
    }

    teardown(): void | Promise<void> | undefined {
        /* TODO: document why this method 'teardown' is empty */
    }

    createEntity(): Entity {
        return this.world.add({});
    }

    destroyEntity(entity: Entity): void {
        this.world.remove(entity);
    }

    addComponents(entity: Entity): void {
        this.world.addComponent(entity, "position", { x: 0, y: 0 });
        this.world.addComponent(entity, "velocity", {
            dx: 1,
            dy: 1,
        });
    }

    removeComponents(entity: Entity): void {
        this.world.removeComponent(entity, "position");
        this.world.removeComponent(entity, "velocity");
    }

    getComponents(entity: Entity): [number, number, number, number] {
        const { position, velocity } = entity;

        return [position.x, position.y, velocity.dx, velocity.dy];
    }

    tick(): void {
        this.movementSystem();
    }
}

const implementation = new MiniPlexImplementation();

export default implementation;
