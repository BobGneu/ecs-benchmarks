import { EntityViewFactory, System } from "perform-ecs";
import { Position } from "../Components/Position";
import { Velocity } from "../Components/Velocity";

export class MovementSystem extends System {
    movingEntities = EntityViewFactory.createView({
        components: [Position, Velocity],
    });

    update() {
        this.movingEntities.entities.forEach((entity) => {
            const [position, velocity] = entity.components as unknown as [
                Position,
                Velocity
            ];

            position.x += velocity.dx;
            position.y += velocity.dy;
        });
    }
}
