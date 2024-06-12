import { Component, Types } from "ecsy";

export class Velocity extends Component<Velocity> {
    static readonly schema = {
        dx: { type: Types.Number },
        dy: { type: Types.Number },
    };

    dx: number = 0;
    dy: number = 0;
}
