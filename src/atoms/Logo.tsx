import { JSX } from "preact";

export type LogoProps = JSX.HTMLAttributes<HTMLImageElement>;

export function Logo(props: LogoProps): JSX.Element {
  return (
    <img
      src="https://site-assets.plasmic.app/fd4e055b222749c879c6e042881ad65e.svg"
      width="128"
      height="128"
      alt="the Fresh logo: a sliced lemon dripping with juice"
      {...props}
    />
  ) // class={classSet(props, "my-6")}
  ;
}
