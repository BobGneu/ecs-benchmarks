import { defineConfig } from "vitest/config";

export default defineConfig({
    define: {
        "import.meta.vitest": "undefined",
    },
    test: {
        setupFiles: ["@vitest/web-worker"],
        coverage: {
            all: true,
            ignoreEmptyLines: true,
            exclude: ["vendored/", "suites/"],
        },
    },
});
