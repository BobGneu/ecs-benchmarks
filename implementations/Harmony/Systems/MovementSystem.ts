export function movementSystem(query: any[]) {
    for (const element of query) {
        const [entities, [position, velocity]] = element;

        for (let j = 0; j < entities.length; j++) {
            position.x[j] += velocity.dx[j];
            position.y[j] += velocity.dy[j];
        }
    }
}
