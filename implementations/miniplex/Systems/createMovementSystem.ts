import { World } from "miniplex";

export function createMovementSystem(world: World) {
    let movingEntities;

    /* Return the system */
    return () => {
        movingEntities ||= world.with("position", "velocity");

        /* Get the index for the archetype we created earlier. */
        const { entities } = movingEntities;

        /* Now apply the velocity to the position. */
        for (const { position, velocity } of entities) {
            position.x += velocity.dx;
            position.y += velocity.dy;
        }
    };
}
