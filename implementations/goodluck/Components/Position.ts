import { HAS_POSITION } from "../constants";

export function position(x, y) {
    return (world, entity) => {
        world.Signature[entity] |= HAS_POSITION;
        world.Position[entity] = { x, y };
    };
}

export interface Position {
    x: number;
    y: number;
}
