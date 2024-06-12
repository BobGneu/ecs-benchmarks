import { Component, Types } from "ecsy";

export class Position extends Component<Position> {
    static readonly schema = {
        x: { type: Types.Number },
        y: { type: Types.Number },
    };

    x: number = 0;
    y: number = 0;
}
