import {
    buildWorld,
    createSystem,
    IEntity,
    IPreptimeWorld,
    IRuntimeWorld,
    queryComponents,
    Read,
    Write,
} from "sim-ecs";
import { ECSBenchmarkHarness } from "../../ECSBenchmarkHarness";
import { Position } from "./Components/Position";
import { Velocity } from "./Components/Velocity";

const implementation: ECSBenchmarkHarness<IRuntimeWorld, IEntity> & {
    prepWorld: IPreptimeWorld;
} = {
    name: "sim-ecs",
    setup: async function (): Promise<IRuntimeWorld> {
        const MovementSystem = createSystem({
            query: queryComponents({
                velocity: Read(Velocity),
                position: Write(Position),
            }),
        })
            .withName("MovementSystem")
            // this function is called every time the world needs to be updated. Put your logic in there
            .withRunFunction(({ query }) =>
                query.execute(({ position, velocity }) => {
                    position.x += velocity.dx;
                    position.y += velocity.dy;
                })
            )
            .build();

        const prepWorld = (this.prepWorld = buildWorld()
            .withName("Sample World")
            .withDefaultScheduling((root) => {
                return root.addNewStage((stage) =>
                    stage.addSystem(MovementSystem)
                );
            })
            .withComponents(Position, Velocity)
            .build());

        return await prepWorld
            .prepareRun({ executionFunction: (fn: Function) => fn() })
            .then((world) => (this.world = world));
    },

    teardown: async function (): Promise<void> {},

    createEntity: function (): IEntity {
        return this.prepWorld.buildEntity().build();
    },

    destroyEntity: function (entity: IEntity): void {
        this.prepWorld.removeEntity(entity);
    },

    addComponents: function (entity: IEntity): void {
        entity.addComponent(new Position(0, 0));
        entity.addComponent(new Velocity(1, 1));
    },

    removeComponents: function (entity: IEntity): void {
        entity.removeComponent(Position);
        entity.removeComponent(Velocity);
    },

    getComponents: function (
        entity: IEntity
    ): [number, number, number, number] {
        const position = entity.getComponent(Position)!;
        const velocity = entity.getComponent(Velocity)!;

        return [position.x, position.y, velocity.dx, velocity.dy];
    },

    tick: async function (): Promise<void> {
        return await this.world.step();
    },
};

export default implementation;
