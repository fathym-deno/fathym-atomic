import { Logo } from "../atoms/Logo.tsx";
import { Action, ActionStyleTypes, Header, HeaderProps } from "../src.deps.ts";

export function FathymHeader(props: HeaderProps) {
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
