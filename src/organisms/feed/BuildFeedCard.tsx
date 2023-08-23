import { ComponentChildren, JSX } from "preact";
import { FeedCard, FeedCardProps } from "../../src.deps.ts";

export interface BuildFeedCardProps extends Omit<FeedCardProps, "subtitle"> {
  username: string;
  repository: string;
  buildNumber: number;
  timestamp: string;
  buildStatus: string;
}

export function BuildFeedCard(props: BuildFeedCardProps): JSX.Element {
  const subtitle = (
    <div class="flex flex-col text-sm text-gray-500">
      <div>{props.repository}</div>
      <div>
        Build #{props.buildNumber} pushed by {props.username}
      </div>
      <div>{props.buildStatus} - {props.timestamp}</div>
    </div>
  );

  return <FeedCard {...props} subtitle={subtitle} />;
}
