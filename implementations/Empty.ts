import { ECSBenchmarkHarness } from "../ECSBenchmarkHarness";

const implementation: ECSBenchmarkHarness<any, any> = {
    name: "Empty",

    setup() {},
    teardown() {},

    createEntity: function () {},
    destroyEntity: function () {},

    addComponents: function () {},
    removeComponents: function () {},

    getComponents: function () {
        return [5, 5, 1, 1];
    },

    tick: function () {},
};

export default implementation;
