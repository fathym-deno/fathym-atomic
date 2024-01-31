// export * from "../../../fathym-deno/atomic/mod.ts";
// import FATC from  "../../../fathym-deno/atomic/tailwind.components.ts";
// export * from "../../../fathym-deno/atomic-chat/mod.ts";
// export * from "../../../fathym-deno/atomic-social/mod.ts";

export * from "https://deno.land/x/fathym_common@v0.0.137/mod.ts";

export * from "https://deno.land/x/fathym_atomic@v0.0.125/mod.ts";
export * from "https://deno.land/x/fathym_atomic_chat@v0.0.29/mod.ts";
export * from "https://deno.land/x/fathym_atomic_iot@v0.0.46/mod.ts";
export * from "https://deno.land/x/fathym_atomic_reports@v0.0.19/mod.ts";
export * from "https://deno.land/x/fathym_atomic_social@v0.0.53/mod.ts";

import FATC from "https://deno.land/x/fathym_atomic@v0.0.125/tailwind.components.ts";
export const FathymAtomicTailwindComponents = FATC;

import FACTC from "https://deno.land/x/fathym_atomic_chat@v0.0.29/tailwind.components.ts";
export const FathymAtomicChatTailwindComponents = FACTC;

import FAITC from "https://deno.land/x/fathym_atomic_iot@v0.0.46/tailwind.components.ts";
export const FathymAtomicIoTTailwindComponents = FAITC;

import FARTC from "https://deno.land/x/fathym_atomic_reports@v0.0.19/tailwind.components.ts";
export const FathymAtomicReportsTailwindComponents = FARTC;

import FASTC from "https://deno.land/x/fathym_atomic_social@v0.0.53/tailwind.components.ts";
export const FathymAtomicSocialTailwindComponents = FASTC;
