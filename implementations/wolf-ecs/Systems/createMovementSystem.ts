export function createMovementSystem(query, position, velocity) {
    return () => {
        for (let i = 0, l = query.archetypes.length; i < l; i++) {
            const arch = query.archetypes[i].entities;

            for (let j = 0, l = arch.length; j < l; j++) {
                const id = arch[j];

                position.x[id] += velocity.dx[id];
                position.y[id] += velocity.dy[id];
            }
        }
    };
}
