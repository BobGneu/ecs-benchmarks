import { Entity, System } from "ecsy";
import { Position } from "../Components/Position";
import { Velocity } from "../Components/Velocity";

export class MovementSystem extends System {
    static readonly queries = {
        movers: {
            components: [Velocity, Position],
        },
    };

    execute(): void {
        const { movers } = this.queries;

        movers.results?.forEach(this.updatePosition);
    }

    updatePosition = (entity: Entity) => {
        const velocityComponent = entity.getComponent(Velocity)!;
        const positionComponent = entity.getMutableComponent(Position)!;

        positionComponent.x += velocityComponent.dx;
        positionComponent.y += velocityComponent.dy;
    };
}
