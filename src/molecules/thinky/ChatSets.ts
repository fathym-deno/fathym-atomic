import { ChatSet } from "./ChatSet.ts";

export type ChatSets = {
  _?: { [id: string]: ChatSet };
  groups?: { [id: string]: ChatSet };
};
