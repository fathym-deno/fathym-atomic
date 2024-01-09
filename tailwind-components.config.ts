import {
  constructTailwindComponentsConfig,
  FathymAtomicTailwindComponents,
} from "./src/src.deps.ts";

await constructTailwindComponentsConfig(
  import.meta,
  [
    {
      Directory: "./src",
      Extensions: [".tsx"],
    },
  ],
  [...FathymAtomicTailwindComponents],
);
