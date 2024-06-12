import { Position } from "../Components/Position";
import { Velocity } from "../Components/Velocity";

export class MovementSystem {
    query: any;

    constructor(world) {
        this.query = world.createQuery({
            all: [Position, Velocity],
            immutableResult: false,
        });
    }

    update() {
        for (let entity of this.query.get()) {
            if (!entity.position || !entity.velocity) {
                continue;
            }

            entity.position.x += entity.velocity.dx;
            entity.position.y += entity.velocity.dy;
        }
    }
}
