import { EntityManager } from "tiny-ecs";
import Entity from "tiny-ecs/lib/Entity";
import { Position } from "../Components/Position";
import { Velocity } from "../Components/Velocity";

export class MovementSystem {
    world: EntityManager;

    constructor(world: EntityManager) {
        this.world = world;
    }

    update() {
        this.world
            .queryComponents([Position, Velocity])
            .forEach((entity: Entity) => {
                entity.position.x += entity.velocity.dx;
                entity.position.y += entity.velocity.dy;
            });
    }
}
