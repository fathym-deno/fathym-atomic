export * from './azure/_exports.ts';
export * from './eac/_exports.ts';

import ChI from './ChatInput.tsx';
export const ChatInput = ChI;
// export { ChatInput, type ChatInputProps } from '../src.deps.ts';

import CM from './ChatMessages.tsx';
export const ChatMessages = CM;

import CI from './CopyInput.tsx';
export const CopyInput = CI;

export {
  ActionGroup,
  type ActionGroupProps,
  ChatBox,
  type ChatBoxProps,
  ClickOnceAction,
  type ClickOnceActionProps,
  Display,
  type DisplayProps,
  DisplayStyleTypes,
  LineItem,
  type LineItemProps,
  MenuButton,
  type MenuButtonProps,
  MenuButtonStyleTypes,
  ResponsiveSet,
  type ResponsiveSetProps,
} from '../src.deps.ts';

export { IoTDisplay, type IoTDisplayProps } from '../src.deps.ts';

export { type Tab, Tabs, type TabsProps } from '../src.deps.ts';
