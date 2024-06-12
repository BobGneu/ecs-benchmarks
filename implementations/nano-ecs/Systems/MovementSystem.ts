import { Position } from "../Components/Position";
import { Velocity } from "../Components/Velocity";

export class MovementSystem {
    world: any;

    constructor(world) {
        this.world = world;
    }

    update() {
        this.world.queryComponents([Position, Velocity]).forEach((entity) => {
            entity.position.x += entity.velocity.dx;
            entity.position.y += entity.velocity.dy;
        });
    }
}
