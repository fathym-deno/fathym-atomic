// export * from "../../../fathym-deno/atomic/mod.ts";
// export * from "../../../fathym-deno/atomic-chat/mod.ts";
// export * from "../../../fathym-deno/atomic-social/mod.ts";

export * from "https://deno.land/x/fathym_common@v0.0.134/mod.ts";

export * from "https://deno.land/x/fathym_atomic@v0.0.115/mod.ts";
export * from "https://deno.land/x/fathym_atomic_chat@v0.0.27/mod.ts";
export * from "https://deno.land/x/fathym_atomic_iot@v0.0.44/mod.ts";
export * from "https://deno.land/x/fathym_atomic_reports@v0.0.17/mod.ts";
export * from "https://deno.land/x/fathym_atomic_social@v0.0.51/mod.ts";

import FATC from "https://deno.land/x/fathym_atomic@v0.0.115/tailwind.components.ts";
export const FathymAtomicTailwindComponents = FATC;

import FACTC from "https://deno.land/x/fathym_atomic_chat@v0.0.27/tailwind.components.ts";
export const FathymAtomicChatTailwindComponents = FACTC;

import FAITC from "https://deno.land/x/fathym_atomic_iot@v0.0.44/tailwind.components.ts";
export const FathymAtomicIoTTailwindComponents = FAITC;

import FARTC from "https://deno.land/x/fathym_atomic_reports@v0.0.17/tailwind.components.ts";
export const FathymAtomicReportsTailwindComponents = FARTC;

import FASTC from "https://deno.land/x/fathym_atomic_social@v0.0.51/tailwind.components.ts";
export const FathymAtomicSocialTailwindComponents = FASTC;
