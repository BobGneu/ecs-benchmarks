import { Position } from "../Components/Position";
import { Velocity } from "../Components/Velocity";
import { HAS_POSITION, HAS_VELOCITY } from "../constants";
import { World } from "../World";

const QUERY_MOVE = HAS_POSITION | HAS_VELOCITY;

export function movementSystem(world: World) {
    for (let entity = 0; entity < world.Signature.length; entity++) {
        if ((world.Signature[entity] & QUERY_MOVE) !== QUERY_MOVE) {
            continue;
        }

        let position = world.Position[entity] as Position;
        let velocity = world.Velocity[entity] as Velocity;

        position.x += velocity.dx;
        position.y += velocity.dy;
    }
}
