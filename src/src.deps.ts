// export * from "../../../fathym-deno/atomic/mod.ts";
// import FATC from "../../../fathym-deno/atomic/tailwind.components.ts";
// export * from "../../../fathym-deno/atomic-chat/mod.ts";
// export * from "../../../fathym-deno/atomic-social/mod.ts";

export { type JSX } from "https://esm.sh/preact@10.20.1";

export * from "https://esm.sh/preact@10.20.1/hooks";

export * from "https://deno.land/x/fathym_common@v0.0.177/mod.ts";

// export { Icon } from "../../atomic-icons/browser.ts";
export { Icon } from "https://deno.land/x/fathym_atomic_icons@v0.0.32/browser.ts";

export * from "https://deno.land/x/fathym_atomic@v0.0.143/mod.ts";
export * from "https://deno.land/x/fathym_atomic_chat@v0.0.37/mod.ts";
export * from "https://deno.land/x/fathym_atomic_iot@v0.0.55/mod.ts";
// export * from "https://deno.land/x/fathym_atomic_reports@v0.0.25/mod.ts";
export * from "https://deno.land/x/fathym_atomic_social@v0.0.58/mod.ts";

export const IS_BROWSER = typeof document !== "undefined";
