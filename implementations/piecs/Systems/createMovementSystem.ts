import { Position } from "../Components/Position";
import { Velocity } from "../Components/Velocity";

export function createMovementSystem(pos: Position, vel: Velocity) {
    return (entities: ArrayLike<number>, _) => {
        for (let i = 0, l = entities.length; i < l; i++) {
            const entity = entities[i];

            pos.x[entity] += vel.dx[entity];
            pos.y[entity] += vel.dy[entity];
        }
    };
}
