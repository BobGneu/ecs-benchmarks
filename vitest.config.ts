import { defineConfig } from "vitest/config";

export default defineConfig({
    define: {
        "import.meta.vitest": "undefined",
    },
    test: {
        setupFiles: ["@vitest/web-worker"],
        // logHeapUsage: true,
        benchmark: {
            outputFile: "verbose",
            outputJson: "reports/results.json",
            compare: "reports/baseline.json",
            reporters: ["verbose", "default"],
        },
        coverage: {
            all: true,
            ignoreEmptyLines: true,
            exclude: ["vendored/", "suites/"],
        },
    },
});
