import { JSX } from "preact";
import { Action, ActionGroup, classSet, Select } from "../../src.deps.ts";

export type CloudConnectExistingFormProps = {
  actionText?: string;

  subs: Record<string, string>;

  title?: string;
} & Omit<JSX.HTMLAttributes<HTMLFormElement>, "title">;

export function CloudConnectExistingForm(props: CloudConnectExistingFormProps) {
  const actionText = props.actionText || "Connect Subscription";

  const title = props.title || "Existing Subscription";

  return (
    <form
      method="post"
      {...props}
      class={classSet(
        ["-:w-full -:max-w-sm -:md:max-w-md -:mx-auto -:py-3 -:mt-8"],
        props,
      )}
    >
      <div class="flex flex-wrap -mx-3 mb-4">
        <div class="w-full px-3">
          <label
            for="subscription-id"
            class="block uppercase tracking-wide font-bold mb-2 text-xl"
          >
            {title}
          </label>

          <Select id="subscription-id" name="subscription-id" required>
            <option value="">-- Select an existing subscription --</option>

            {Object.keys(props.subs).map((id) => {
              const name = props.subs[id];

              return <option value={id}>{name}</option>;
            })}
          </Select>
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
