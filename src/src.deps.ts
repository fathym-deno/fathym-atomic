// export * from "../../../fathym-deno/atomic/mod.ts";
// export * from "../../../fathym-deno/atomic-chat/mod.ts";
// export * from "../../../fathym-deno/atomic-social/mod.ts";

export * from "https://deno.land/x/fathym_common@v0.0.131/mod.ts";

export * from "https://deno.land/x/fathym_atomic@v0.0.111/mod.ts";
export * from "https://deno.land/x/fathym_atomic_chat@v0.0.25/mod.ts";
export * from "https://deno.land/x/fathym_atomic_iot@v0.0.42/mod.ts";
export * from "https://deno.land/x/fathym_atomic_reports@v0.0.15/mod.ts";
export * from "https://deno.land/x/fathym_atomic_social@v0.0.49/mod.ts";

import FATC from "https://deno.land/x/fathym_atomic@v0.0.111/tailwind.components.ts";
export const FathymAtomicTailwindComponents = FATC;

import FACTC from "https://deno.land/x/fathym_atomic_chat@v0.0.25/tailwind.components.ts";
export const FathymAtomicChatTailwindComponents = FACTC;

import FAITC from "https://deno.land/x/fathym_atomic_iot@v0.0.42/tailwind.components.ts";
export const FathymAtomicIoTTailwindComponents = FAITC;

import FARTC from "https://deno.land/x/fathym_atomic_reports@v0.0.15/tailwind.components.ts";
export const FathymAtomicReportsTailwindComponents = FARTC;

import FASTC from "https://deno.land/x/fathym_atomic_social@v0.0.49/tailwind.components.ts";
export const FathymAtomicSocialTailwindComponents = FASTC;
