export * from './azure/_exports.ts';
export * from './eac/_exports.ts';

export * from './thinky/.exports.ts';

import CI from './CopyInput.tsx';
export const CopyInput = CI;

export {
  ActionGroup,
  type ActionGroupProps,
  // ChatBox,
  // type ChatBoxProps,
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

// export { IoTDisplay, type IoTDisplayProps } from '../src.deps.ts';

export { type Tab, Tabs, type TabsProps } from '../src.deps.ts';
