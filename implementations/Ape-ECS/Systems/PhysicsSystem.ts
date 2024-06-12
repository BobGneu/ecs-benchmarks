import { Query, System } from "ape-ecs";

export class MovementSystem extends System {
    private query!: Query;

    init() {
        this.query = this.createQuery().fromAll("Position", "Velocity");
    }

    update() {
        const entities = this.query.execute();

        for (const entity of entities) {
            const position = entity.getOne("Position");
            const velocity = entity.getOne("Velocity");

            if (!position || !velocity) {
                continue;
            }

            position.update({
                x: position.x + velocity.dx,
                y: position.y + velocity.dy,
            });
        }
    }
}
