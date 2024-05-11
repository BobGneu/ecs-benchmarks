# Test Cases

- Test cases are independent
- Test cases have all irrelevant actions handled in their setup/teardown
- **Implementations are tunable**, each may have its own setup & teardown implementation, and their current implementation may be sub optimal. Feel free to open a PR with adjustments.
- Unless otherwise noted, the goal for each implementation will be the velocity calculation, handled by a single system.
- In order to provide a baseline/standard candle, I also run an empty benchmark.

## Library Initialization

**Intent**: Compare the time taken to be fully configured and ready to begin an update operation.

## Creating & Destroying an Entity

**Intent**: Compare the time taken to create an entity, and then to destory it.

## Attaching & Detatching a component

**Intent**: Compare the time taken to add a component to an entity and then remove it.

## Empty world update

**Intent**: Run all systems registered with the world where no entities exist.

## One Entity world update

**Intent**: Run all systems registered with the world where one entity exists.

## 1000 Entities world update

**Intent**: Run all systems registered with the world where 1000 entities exists.

## 100000 Entities world update

**Intent**: Run all systems registered with the world where 100000 entities exists.

## Lifecycle

**Intent**: Compare execution times for a more representative case around the lifecycle of a single entity.

## Large Lifecycle

**Intent**: Compare execution times for a more representative case around the lifecycle of a large number of entities and systems interacting on them.
