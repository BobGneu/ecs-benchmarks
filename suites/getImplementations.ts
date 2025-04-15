import { ECSBenchmarkHarness } from "../ECSBenchmarkHarness";
import * as implementationMap from "../implementations";
import Empty from "../implementations/Empty";

const implementations = Object.values(implementationMap);

export function getImplementations() {
    return implementations as ECSBenchmarkHarness<any, any>[];
}

export function getBenchmarkImplementations() {
    return [Empty, ...implementations] as Array<
        ECSBenchmarkHarness<any, any> & { world: any }
    >;
}
