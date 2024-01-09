import { JSX } from "preact";
import { Subscription } from "npm:@azure/arm-subscriptions";
import { Action, ActionGroup, classSet } from "../../src.deps.ts";

export type CloudConnectExistingFormProps = {
  actionText?: string;

  subs: Subscription[];

  title?: string;
} & Omit<JSX.HTMLAttributes<HTMLFormElement>, "title">;

export function CloudConnectExistingForm(props: CloudConnectExistingFormProps) {
  const actionText = props.actionText || "Connect Subscription";

  const title = props.title || "Existing Subscription";

  return (
    <form
      {...props}
      class={classSet(props, "w-full max-w-sm md:max-w-md mx-auto py-3 mt-8")}
    >
      <div class="flex flex-wrap -mx-3 mb-4">
        <div class="w-full px-3">
          <label
            for="subscription-id"
            class="block uppercase tracking-wide font-bold mb-2 text-xl"
          >
            {title}
          </label>

          <select
            id="subscription-id"
            name="subscription-id"
            required
            class="appearance-none block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:shadow-lg focus:border-blue-500 placeholder-gray-500"
          >
            <option value="">-- Select an existing subscription --</option>

            {props.subs.map((sub) => {
              return (
                <option value={sub.subscriptionId}>{sub.displayName}</option>
              );
            })}
          </select>
        </div>
      </div>

      <ActionGroup class="mt-8 flex-col">
        <>
          <Action
            type="submit"
            class="w-full md:w-auto text-white font-bold m-1 py-2 px-4 rounded focus:outline-none shadow-lg"
          >
            {actionText}
          </Action>
        </>
      </ActionGroup>
    </form>
  );
}
