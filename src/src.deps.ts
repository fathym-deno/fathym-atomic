// export * from "../../../fathym-deno/atomic/mod.ts";
// import FATC from "../../../fathym-deno/atomic/tailwind.components.ts";
// export * from "../../../fathym-deno/atomic-chat/mod.ts";
// export * from "../../../fathym-deno/atomic-social/mod.ts";

export { type ComponentChildren, type JSX } from "preact";
export * from "preact/hooks";
export { Signal, useComputed, useSignal } from "npm:@preact/signals@1.2.3";
export {} from "npm:@preact/signals-core@1.6.0";

export { render as gfmRender } from "jsr:@deno/gfm@0.6.2";

export * from "jsr:@fathym/common@0.0.211";

// export { Icon } from "../../atomic-icons/browser.ts";
export { Icon } from "jsr:@fathym/atomic-icons@0.0.51/browser";

export * from "jsr:@fathym/atomic@0.0.156";
// export * from "fathym_atomic_chat/mod.ts";
// export * from "fathym_atomic_iot/mod.ts";
// export * from "https://deno.land/x/fathym_atomic_reports@v0.0.29/mod.ts";
// export * from "fathym_atomic_social/mod.ts";

export const IS_BROWSER = typeof document !== "undefined";
