import { HAS_VELOCITY } from "../constants";
import { World } from "../World";

export function velocity(dx: number, dy: number) {
    return (world: World, entity: number) => {
        world.Signature[entity] |= HAS_VELOCITY;
        world.Velocity[entity] = { dx, dy };
    };
}

export interface Velocity {
    dx: number;
    dy: number;
}
