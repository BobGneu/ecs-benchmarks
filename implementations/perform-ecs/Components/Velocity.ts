import { Component, makeComponent } from "perform-ecs";

@makeComponent
export class Velocity extends Component {
    dx = 0;
    dy = 0;

    reset() {
        this.dx = 0;
        this.dy = 0;
    }
}
