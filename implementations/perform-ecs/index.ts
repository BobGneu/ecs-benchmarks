import { ECS, Entity, makeComponent } from "perform-ecs";
import { ECSBenchmarkHarness } from "../../ECSBenchmarkHarness";
import { Position } from "./Components/Position";
import { Velocity } from "./Components/Velocity";
import { MovementSystem } from "./Systems/MovementSystem";

class PerformECSImplementation extends ECSBenchmarkHarness<ECS, Entity> {
    get name(): string {
        return "Perform ECS";
    }

    private world!: ECS;

    setup(): ECS | Promise<ECS> {
        const world = (this.world = new ECS());
        const movementSystem = new MovementSystem();

        makeComponent(Position);
        makeComponent(Velocity);

        world.registerSystem(movementSystem);

        return world;
    }
    teardown(): void | Promise<void> | undefined {}
    createEntity(): Entity {
        return this.world.createEntity([]);
    }
    destroyEntity(entity: Entity): void {
        this.world.removeEntity(entity);
    }
    addComponents(entity: Entity): void {
        this.world.addComponentsToEntity(entity, [
            { component: Position },
            { component: Velocity },
        ]);

        const [position, velocity] = entity.components as unknown as [
            Position,
            Velocity
        ];

        position.x = 0;
        position.y = 0;
        velocity.dx = 1;
        velocity.dy = 1;
    }
    removeComponents(entity: Entity): void {
        this.world.removeComponentsFromEntity(entity, [Position, Velocity]);
    }
    getComponents(entity: Entity): [number, number, number, number] {
        const [position, velocity] = entity.components as unknown as [
            Position,
            Velocity
        ];

        return [position.x, position.y, velocity.dx, velocity.dy];
    }
    tick(): void {
        this.world.update(0);
    }
}

const implementation = new PerformECSImplementation();

export default implementation;
