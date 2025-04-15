import { ECSBenchmarkHarness } from "../ECSBenchmarkHarness";
import * as implementationMap from "../implementations";
import Empty from "../implementations/Empty";

const implementations = Object.values(implementationMap);

export function getImplementations() {
    return [Empty, ...implementations] as ECSBenchmarkHarness<any, any>[];
}
