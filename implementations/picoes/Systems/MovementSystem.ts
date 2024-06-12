import { World } from "picoes";

export class MovementSystem {
    world: World;
    state: any;

    run() {
        this.world.each("position", "velocity", ({ position, velocity }) => {
            position.x += velocity.dx;
            position.y += velocity.dy;
        });
    }
}
