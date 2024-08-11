import { Logo } from "../atoms/Logo.tsx";
import {
  Action,
  ActionStyleTypes,
  Header,
  type HeaderProps,
  type JSX,
} from "../src.deps.ts";

export function FathymHeader(props: HeaderProps): JSX.Element {
  return (
    <Header
      logo={
        <Action
          href="/"
          actionStyle={ActionStyleTypes.Link | ActionStyleTypes.Rounded}
        >
          <Logo />
        </Action>
      }
      {...props}
    />
  );
}
