import type {
  JSX,
  // FeedCard,
  // FeedCardProps
} from "../../src.deps.ts";

// export interface BuildFeedCardProps extends Omit<FeedCardProps, 'subtitle'> {
//   repository: string;
//   subtext: number;
//   timestamp: string;
//   buildStatus: string;
// }

export function BuildFeedCard(): JSX.Element {
  return <></>;
  // const subtitle = (
  //   <div class="flex flex-col text-sm text-gray-500">
  //     <div>{props.repository}</div>
  //     <div>{props.subtext}</div>
  //     <div>
  //       {props.buildStatus} - {props.timestamp}
  //     </div>
  //   </div>
  // );

  // return <FeedCard {...props} subtitle={subtitle} />;
}
