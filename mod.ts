export * from "./src/.exports.ts";

import { islandsConfig as atomicIslandsConfig } from "./src/src.deps.ts";

export function islandsConfig(): { baseLocation: string; paths: string[] }[] {
  return [
    ...atomicIslandsConfig(),
    {
      baseLocation: import.meta.url,
      paths: [],
    },
  ];
}
