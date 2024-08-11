import type { JSX } from "../../src.deps.ts";

export { type CloudConnectSubProps } from "./CloudConnectSub.tsx";
export { type ConnectAzureProps } from "./ConnectAzure.tsx";

import CCS, { type CloudConnectSubProps } from "./CloudConnectSub.tsx";
export const CloudConnectSub: (props: CloudConnectSubProps) => JSX.Element =
  CCS;

import CA, { type ConnectAzureProps } from "./ConnectAzure.tsx";
export const ConnectAzure: (props: ConnectAzureProps) => JSX.Element = CA;
