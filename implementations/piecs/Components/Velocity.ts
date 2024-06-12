import { World } from "piecs";

export interface Velocity {
    id: number;
    dx: Float32Array;
    dy: Float32Array;
}

export function createVelocityComponent(world: World) {
    return {
        id: world.createComponentId(),
        dx: new Float32Array(1e6),
        dy: new Float32Array(1e6),
    };
}
