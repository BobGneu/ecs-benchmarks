import { World } from "piecs";

export interface Position {
    id: number;
    x: Float32Array;
    y: Float32Array;
}

export function createPositionComponent(world: World) {
    return {
        id: world.createComponentId(),
        x: new Float32Array(1e6),
        y: new Float32Array(1e6),
    };
}
