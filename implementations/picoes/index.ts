import { Entity, World } from "picoes";
import { ECSBenchmarkHarness } from "../../ECSBenchmarkHarness";
import { name, version } from "../../node_modules/picoes/package.json";
import { MovementSystem } from "./Systems/MovementSystem";

class PicoESImplementation extends ECSBenchmarkHarness<World, Entity> {
    get name(): string {
        return `${name} v.${version}`;
    }

    private world!: World;

    setup() {
        return (this.world = new World({
            components: {},
            systems: [MovementSystem],
            context: { state: {} },
        }));
    }

    teardown(): void | Promise<void> | undefined {
        /* TODO: document why this method 'teardown' is empty */
    }

    createEntity() {
        return this.world.entity();
    }

    destroyEntity(entity: Entity): void {
        entity.destroy();
    }

    addComponents(entity: Entity): void {
        entity.set("position", { x: 0, y: 0 });
        entity.set("velocity", { dx: 1, dy: 1 });
    }

    removeComponents(entity: Entity): void {
        entity.remove("position");
        entity.remove("velocity");
    }

    getComponents(entity: Entity): [number, number, number, number] {
        const position = entity.get("position");
        const velocity = entity.get("velocity");

        return [position.x, position.y, velocity.dx, velocity.dy];
    }

    tick(): void {
        this.world.run();
    }
}

const implementation = new PicoESImplementation();

export default implementation;
