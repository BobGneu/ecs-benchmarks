import { createQuery } from "@javelin/ecs";
import { Position } from "../Components/Position";
import { Velocity } from "../Components/Velocity";

export function createMovementSystem() {
    const movingEntities = createQuery(Position, Velocity);

    return () => {
        for (const [entities, [positions, velocities]] of movingEntities) {
            for (let i = 0; i < entities.length; i++) {
                positions[i].x += velocities[i].dx;
                positions[i].y += velocities[i].dy;
            }
        }
    };
}
