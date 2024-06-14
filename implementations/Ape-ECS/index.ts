import { Entity, World } from "ape-ecs";
import { ECSBenchmarkHarness } from "../../ECSBenchmarkHarness";
import { name, version } from "../../node_modules/ape-ecs/package.json";
import { Position } from "./Components/Position";
import { Velocity } from "./Components/Velocity";
import { MovementSystem } from "./Systems/PhysicsSystem";

class ApeECSImplementation extends ECSBenchmarkHarness<World, Entity> {
    get name(): string {
        return `${name} v.${version}`;
    }

    private world!: World;

    setup(): World | Promise<World> {
        const world = (this.world = new World());

        world.registerComponent(Position);
        world.registerComponent(Velocity);

        world.registerSystem("primary", MovementSystem);

        return world;
    }

    teardown(): void | Promise<void> | undefined {
        /* TODO: document why this method 'teardown' is empty */
    }

    createEntity(): Entity {
        return this.world.createEntity({});
    }

    destroyEntity(entity: Entity): void {
        entity.destroy();
    }

    addComponents(entity: Entity): void {
        entity.addComponent({
            type: "Position",
            x: 0,
            y: 0,
        });

        entity.addComponent({
            type: "Velocity",
            dx: 1,
            dy: 1,
        });
    }

    removeComponents(entity: Entity): void {
        entity.removeComponent("Position");
        entity.removeComponent("Velocity");
    }

    getComponents(entity: Entity): [number, number, number, number] {
        const position = entity.getOne("Position");
        const velocity = entity.getOne("Velocity");

        return [position?.x, position?.y, velocity?.dx, velocity?.dy];
    }

    tick(): void {
        this.world.runSystems("primary");
    }
}

const implementation = new ApeECSImplementation();

export default implementation;
