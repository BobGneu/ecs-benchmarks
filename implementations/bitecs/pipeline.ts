import {
    addComponent,
    addEntity,
    createWorld,
    defineComponent,
    defineQuery,
    defineSystem,
    IWorld,
    pipe,
    removeComponent,
    removeEntity,
    System,
    Types,
} from "bitecs";
import { ECSBenchmarkHarness } from "../../ECSBenchmarkHarness";

class BitECSPipelineImplementation extends ECSBenchmarkHarness<IWorld, number> {
    get name(): string {
        return "bitECS - Direct";
    }

    private world!: IWorld;
    private position!: any;
    private velocity!: any;
    private pipeline!: System<[], IWorld>;

    setup(): IWorld | Promise<IWorld> {
        const world = (this.world = createWorld());

        const Position = (this.position = defineComponent({
            x: Types.f32,
            y: Types.f32,
        }));
        const Velocity = (this.velocity = defineComponent({
            dx: Types.f32,
            dy: Types.f32,
        }));

        const query = defineQuery([Position, Velocity]);

        const physicsSystem = defineSystem((world) => {
            const ents = query(world);

            for (const element of ents) {
                const eid = element;
                Position.x[eid] += Velocity.dx[eid];
                Position.y[eid] += Velocity.dy[eid];
            }

            return world;
        });

        this.pipeline = pipe(physicsSystem);

        return world;
    }

    teardown(): void | Promise<void> | undefined {
        /* TODO: document why this method 'teardown' is empty */
    }

    createEntity(): number {
        return addEntity(this.world);
    }

    destroyEntity(entity: number): void {
        removeEntity(this.world, entity);
    }

    addComponents(entity: number): void {
        addComponent(this.world, this.position, entity);
        addComponent(this.world, this.velocity, entity);

        this.velocity.dx[entity] = 1;
        this.velocity.dy[entity] = 1;
    }

    removeComponents(entity: number): void {
        removeComponent(this.world, this.position, entity);
        removeComponent(this.world, this.velocity, entity);
    }

    getComponents(entity: number): [number, number, number, number] {
        return [
            this.position.x[entity],
            this.position.y[entity],
            this.velocity.dx[entity],
            this.velocity.dy[entity],
        ];
    }

    tick(): void {
        this.pipeline(this.world);
    }
}

const implementation = new BitECSPipelineImplementation();

export default implementation;
