export * from "./src/_exports.ts";

import { islandsConfig as atomicIslandsConfig } from "@fathym/atomic";

export function islandsConfig() {
  return [
    ...atomicIslandsConfig(),
    {
      baseLocation: import.meta.url,
      paths: [
        "./src/molecules/MenuButton.tsx",
        "./src/molecules/ResponsiveSet.tsx",
        "./src/molecules/Tabs.tsx",
      ],
    },
  ];
}
