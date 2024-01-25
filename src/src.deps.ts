// export * from "../../../fathym-deno/atomic/mod.ts";
// export * from "../../../fathym-deno/atomic-chat/mod.ts";
// export * from "../../../fathym-deno/atomic-social/mod.ts";

export * from "https://deno.land/x/fathym_common@v0.0.134/mod.ts";

export * from "https://deno.land/x/fathym_atomic@v0.0.114/mod.ts";
export * from "https://deno.land/x/fathym_atomic_chat@v0.0.26/mod.ts";
export * from "https://deno.land/x/fathym_atomic_iot@v0.0.43/mod.ts";
export * from "https://deno.land/x/fathym_atomic_reports@v0.0.16/mod.ts";
export * from "https://deno.land/x/fathym_atomic_social@v0.0.50/mod.ts";

import FATC from "https://deno.land/x/fathym_atomic@v0.0.114/tailwind.components.ts";
export const FathymAtomicTailwindComponents = FATC;

import FACTC from "https://deno.land/x/fathym_atomic_chat@v0.0.26/tailwind.components.ts";
export const FathymAtomicChatTailwindComponents = FACTC;

import FAITC from "https://deno.land/x/fathym_atomic_iot@v0.0.43/tailwind.components.ts";
export const FathymAtomicIoTTailwindComponents = FAITC;

import FARTC from "https://deno.land/x/fathym_atomic_reports@v0.0.16/tailwind.components.ts";
export const FathymAtomicReportsTailwindComponents = FARTC;

import FASTC from "https://deno.land/x/fathym_atomic_social@v0.0.50/tailwind.components.ts";
export const FathymAtomicSocialTailwindComponents = FASTC;
