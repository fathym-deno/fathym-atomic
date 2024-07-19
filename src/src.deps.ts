// export * from "../../../fathym-deno/atomic/mod.ts";
// import FATC from "../../../fathym-deno/atomic/tailwind.components.ts";
// export * from "../../../fathym-deno/atomic-chat/mod.ts";
// export * from "../../../fathym-deno/atomic-social/mod.ts";

export { type JSX } from "https://esm.sh/preact@10.20.1";
export * from "https://esm.sh/preact@10.20.1/hooks";
export { Signal } from "https://esm.sh/*@preact/signals@1.2.3";
export {} from "https://esm.sh/*@preact/signals-core@1.6.0";

export * from "https://deno.land/x/fathym_common@v0.0.185/mod.ts";

// export { Icon } from "../../atomic-icons/browser.ts";
export { Icon } from "https://deno.land/x/fathym_atomic_icons@v0.0.39/browser.ts";

export * from "https://deno.land/x/fathym_atomic@v0.0.150/mod.ts";
export * from "https://deno.land/x/fathym_atomic_chat@v0.0.41/mod.ts";
export * from "https://deno.land/x/fathym_atomic_iot@v0.0.61/mod.ts";
// export * from "https://deno.land/x/fathym_atomic_reports@v0.0.29/mod.ts";
export * from "https://deno.land/x/fathym_atomic_social@v0.0.60/mod.ts";

export const IS_BROWSER = typeof document !== "undefined";
