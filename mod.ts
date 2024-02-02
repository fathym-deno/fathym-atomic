export * from "./src/_exports.ts";

import { islandsConfig as atomicIslandsConfig } from "./src/src.deps.ts";

export function islandsConfig() {
  return [
    ...atomicIslandsConfig(),
    {
      baseLocation: import.meta.url,
      paths: [],
    },
  ];
}
