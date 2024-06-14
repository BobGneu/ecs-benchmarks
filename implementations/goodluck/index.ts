import { ECSBenchmarkHarness } from "../../ECSBenchmarkHarness";
import { name, version } from "../../node_modules/goodluck/package.json";
import { position } from "./Components/Position";
import { velocity } from "./Components/Velocity";
import { HAS_POSITION, HAS_VELOCITY } from "./constants";
import { movementSystem } from "./Systems/movementSystem";
import { World } from "./World";

class GoodluckImplementation extends ECSBenchmarkHarness<World, number> {
    get name(): string {
        return `${name} v.${version}`;
    }

    private world!: World;

    setup(): World | Promise<World> {
        return (this.world = new World());
    }

    teardown(): void | Promise<void> | undefined {}

    createEntity(): number {
        return this.world.CreateEntity();
    }

    destroyEntity(entity: number): void {
        this.world.DestroyEntity(entity);
    }

    addComponents(entity: number): void {
        position(0, 0)(this.world, entity);
        velocity(1, 1)(this.world, entity);
    }

    removeComponents(entity: number): void {
        this.world.Signature[entity] &= ~HAS_POSITION;
        this.world.Signature[entity] &= ~HAS_VELOCITY;
    }

    getComponents(entity: number): [number, number, number, number] {
        return [
            this.world.Position[entity].x,
            this.world.Position[entity].y,
            this.world.Velocity[entity].dx,
            this.world.Velocity[entity].dy,
        ];
    }

    tick(): void {
        movementSystem(this.world);
    }
}

const implementation = new GoodluckImplementation();

export default implementation;
