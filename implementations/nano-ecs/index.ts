import nano from "nano-ecs";
import { ECSBenchmarkHarness } from "../../ECSBenchmarkHarness";
import { name, version } from "../../node_modules/nano-ecs/package.json";
import { Position } from "./Components/Position";
import { Velocity } from "./Components/Velocity";
import { MovementSystem } from "./Systems/MovementSystem";

class NanoECSImplementation extends ECSBenchmarkHarness<nano, any> {
    get name(): string {
        return `${name} v.${version}`;
    }

    private world!: nano;
    private movementSystem!: MovementSystem;

    setup() {
        this.world = nano();

        this.movementSystem = new MovementSystem(this.world);
    }

    teardown(): void | Promise<void> | undefined {
        /* TODO: document why this method 'teardown' is empty */
    }

    createEntity() {
        return this.world.createEntity();
    }

    destroyEntity(entity: any): void {
        entity.remove();
    }

    addComponents(entity: any): void {
        entity.addComponent(Position);
        entity.addComponent(Velocity);

        entity.position.x = 0;
        entity.position.y = 0;

        entity.velocity.dx = 1;
        entity.velocity.dy = 1;
    }

    removeComponents(entity: any): void {
        entity.removeComponent(Position);
        entity.removeComponent(Velocity);
    }

    getComponents(entity: any): [number, number, number, number] {
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

const implementation = new NanoECSImplementation();

export default implementation;
