export * from './ChatSet.ts';
export * from './ChatSets.ts';

// export { ChatInput, type ChatInputProps } from '../../src.deps.ts';
import ChI from './ChatInput.tsx';
export const ChatInput = ChI;
export { type ChatInputProps } from './ChatInput.tsx';

import CM from './ChatMessages.tsx';
export const ChatMessages = CM;
export { type ChatMessagesProps } from './ChatMessages.tsx';

import CHs from './Chats.tsx';
export const Chats = CHs;
export { type ChatsProps } from './Chats.tsx';

import TH from './Thinky.tsx';
export const Thinky = TH;
export { type ThinkyProps } from './Thinky.tsx';
