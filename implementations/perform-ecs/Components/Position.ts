import { Component, makeComponent } from "perform-ecs";

@makeComponent
export class Position extends Component {
    x = 0;
    y = 0;

    reset() {
        this.x = 0;
        this.y = 0;
    }
}
