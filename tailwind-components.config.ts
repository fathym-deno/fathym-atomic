import {
  constructTailwindComponentsConfig,
  FathymAtomicChatTailwindComponents,
  FathymAtomicIoTTailwindComponents,
  FathymAtomicReportsTailwindComponents,
  FathymAtomicSocialTailwindComponents,
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
  [
    ...FathymAtomicTailwindComponents,
    ...FathymAtomicChatTailwindComponents,
    ...FathymAtomicIoTTailwindComponents,
    ...FathymAtomicReportsTailwindComponents,
    ...FathymAtomicSocialTailwindComponents,
  ],
);
