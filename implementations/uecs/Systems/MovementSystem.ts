import { View, World } from "uecs";
import { Position } from "../Components/Position";
import { Velocity } from "../Components/Velocity";

export class MovementSystem {
    movedEntities: View<[typeof Position, typeof Velocity]>;

    constructor(world: World) {
        this.movedEntities = world.view(Position, Velocity);
    }

    update() {
        this.movedEntities.each((_, position, velocity) => {
            position.x += velocity.dx;
            position.y += velocity.dy;
        });
    }
}
