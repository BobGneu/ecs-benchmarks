import { EntityManager, Messanger as Messenger } from "tiny-ecs";
import Entity from "tiny-ecs/lib/Entity";
import { ECSBenchmarkHarness } from "../../ECSBenchmarkHarness";
import { name, version } from "../../node_modules/tiny-ecs/package.json";
import { Position } from "./Components/Position";
import { Velocity } from "./Components/Velocity";
import { MovementSystem } from "./Systems/MovementSystem";

class TinyECSImplementation extends ECSBenchmarkHarness<EntityManager, Entity> {
    get name(): string {
        return `${name} v.${version}`;
    }

    private world!: EntityManager;
    private movementSystem!: MovementSystem;

    setup() {
        const world = (this.world = new EntityManager(new Messenger()));

        this.movementSystem = new MovementSystem(world);

        return world;
    }

    teardown(): void | Promise<void> | undefined {
        // TODO: document why this method 'teardown' is empty
    }

    createEntity() {
        return this.world.createEntity();
    }

    destroyEntity(entity: Entity): void {
        entity.remove();
    }

    addComponents(entity: Entity): void {
        entity.addComponent(Position);
        entity.addComponent(Velocity);

        entity.position.x = 0;
        entity.position.y = 0;
        entity.velocity.dx = 1;
        entity.velocity.dy = 1;
    }

    removeComponents(entity: Entity): void {
        entity.removeComponent(Position);
        entity.removeComponent(Velocity);
    }

    getComponents(entity: Entity): [number, number, number, number] {
        const { position, velocity } = entity;

        return [position.x, position.y, velocity.dx, velocity.dy];
    }

    tick(): void {
        this.movementSystem.update();
    }
}

const implementation = new TinyECSImplementation();

export default implementation;
