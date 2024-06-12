import { ECSBenchmarkHarness } from "../ECSBenchmarkHarness";
import * as implementationMap from "../implementations";

const implementations = Object.values(implementationMap);

export function getImplementations() {
    return implementations as ECSBenchmarkHarness<any, any>[];
}
