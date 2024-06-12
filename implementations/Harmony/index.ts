import { Entity, Format, Query, Schema, World } from "harmony-ecs";
import { ECSBenchmarkHarness } from "../../ECSBenchmarkHarness";
import { Position } from "./Components/Position";
import { Velocity } from "./Components/Velocity";
import { movementSystem } from "./Systems/MovementSystem";

class HarmonyImplementation extends ECSBenchmarkHarness<any, number> {
    get name(): string {
        return "harmony-ecs";
    }

    private world!: World.Struct;
    private position!: any;
    private velocity!: any;
    private query!: Query.Struct<any[]>;

    setup() {
        const world = (this.world = World.make(1e6));

        this.position = Schema.makeBinary(world, {
            x: Format.float32,
            y: Format.float32,
        });

        this.velocity = Schema.makeBinary(world, {
            dx: Format.float32,
            dy: Format.float32,
        });

        this.query = Query.make(world, [this.position, this.velocity]);
    }

    teardown(): void | Promise<void> | undefined {
        /* TODO: document why this method 'teardown' is empty */
    }

    createEntity(): number {
        return Entity.make(this.world);
    }

    destroyEntity(entity: number): void {
        Entity.destroy(this.world, entity);
    }

    addComponents(entity: number): void {
        Entity.set(this.world, entity, [this.position], [{ x: 0, y: 0 }]);
        Entity.set(this.world, entity, [this.velocity], [{ dx: 1, dy: 1 }]);
    }

    removeComponents(entity: number): void {
        Entity.unset(this.world, entity, [this.position]);
        Entity.unset(this.world, entity, [this.velocity]);
    }

    getComponents(entity: number): [number, number, number, number] {
        const [position, velocity]: [Position, Velocity] = Entity.get(
            this.world,
            entity,
            [this.position, this.velocity]
        );

        return [position.x, position.y, velocity.dx, velocity.dy];
    }

    tick(): void {
        movementSystem(this.query);
    }
}

const implementation = new HarmonyImplementation();

export default implementation;
