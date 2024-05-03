import {
  Action,
  ActionGroup,
  classSet,
  Input,
  JSX,
  Select,
  SlideToggle,
} from "../../src.deps.ts";

export type CloudConnectNewSubFormProps = {
  billingScopes: Record<string, string>;

  tenants: Record<string, string>;
} & JSX.HTMLAttributes<HTMLFormElement>;

export default function CloudConnectNewSubForm(
  props: CloudConnectNewSubFormProps,
) {
  return (
    <form
      method="post"
      {...props}
      class={classSet(
        ["-:w-full -:max-w-sm -:md:max-w-md -:mx-auto -:p-3 -:mt-8"],
        props,
      )}
    >
      <div class="flex flex-wrap -mx-3 mb-4">
        <div class="w-full px-3">
          <label
            for="subscription-name"
            class="block uppercase tracking-wide font-bold mb-2 text-xl"
          >
            New Subscription Name
          </label>

          <Input
            id="subscription-name"
            name="subscription-name"
            type="text"
            required
            placeholder="Enter new subscription name"
          />
        </div>
      </div>

      <div class="flex flex-wrap -mx-3 mb-4">
        <div class="w-full px-3">
          <label
            for="billing-scope"
            class="block uppercase tracking-wide font-bold mb-2 text-xl"
          >
            Billing Scope
          </label>

          <Select id="billing-scope" name="billing-scope" required>
            <option value="">-- Select an existing billing account --</option>

            {Object.keys(props.billingScopes).map((id) => {
              const name = props.billingScopes[id];

              return <option value={id}>{name}</option>;
            })}
          </Select>
        </div>
      </div>

      {
        /* <div class="flex flex-wrap -mx-3 mb-4">
        <div class="w-full px-3">
          <label
            for="tenant-id"
            class="block uppercase tracking-wide font-bold mb-2 text-xl"
          >
            Tenant
          </label>

          <Select id="tenant-id" name="tenant-id" required>
            <option value="">-- Select an existing tenant --</option>

            {Object.keys(props.tenants).map((id) => {
              const name = props.tenants[id];

              return <option value={id}>{name}</option>;
            })}
          </Select>
        </div>
      </div> */
      }

      <div class="flex flex-wrap -mx-3 mb-4">
        <div class="w-full px-3">
          <SlideToggle
            id="is-dev"
            name="is-dev"
            class="after:top-[7px]"
            checked
          >
            <span class="ml-2 h-[34px] leading-[34px]">
              Is Production Workload?
            </span>
          </SlideToggle>
        </div>
      </div>

      <ActionGroup class="mt-8 flex-col">
        <>
          <Action
            type="submit"
            class={classSet([
              "w-full md:w-auto text-white font-bold m-1 py-2 px-4 rounded focus:outline-none shadow-lg",
            ])}
          >
            Create Subscription
          </Action>
        </>
      </ActionGroup>
    </form>
  );
}
