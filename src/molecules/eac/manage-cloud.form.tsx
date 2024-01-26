import { JSX } from "preact";
import { Action, ActionGroup, classSet, Input } from "../../src.deps.ts";

export type EaCManageCloudFormProps = JSX.HTMLAttributes<HTMLFormElement> & {
  cloudApplicationID?: string;
  cloudAuthKey?: string;
  cloudDescription?: string;
  cloudLookup?: string;
  cloudName?: string;
  cloudSubscriptionID?: string;
  cloudTenantID?: string;
  entLookup?: string;
};

export function EaCManageCloudForm(props: EaCManageCloudFormProps) {
  return (
    <form
      method="post"
      {...props}
      class={classSet(
        ["w-full max-w-sm md:max-w-md mx-auto py-3 mt-8"],
        props,
        "-:",
      )}
    >
      <div class="flex flex-wrap -mx-3 mb-4">
        <div class="w-full px-3">
          <label
            for="subscription-plan"
            class="block uppercase tracking-wide font-bold mb-2 text-xl"
          >
            Cloud Connection
          </label>

          <p class="block text-md mb-8">
            Use the Fathym CLI to easily create and configure an Azure cloud
            connection with a new managed subscription or existing subscription
            from your account. Using NPM, call the{" "}
            <span class="font-bold bg-slate-300 px-1">
              npx fathym eac env clouds azure generate
            </span>{" "}
            command and then copy in the values displayed to this form.
          </p>

          <Input
            id="entLookup"
            name="entLookup"
            type="hidden"
            value={props.entLookup}
          />

          <Input
            id="cloudLookup"
            name="cloudLookup"
            type="hidden"
            value={props.cloudLookup}
          />

          <div class="w-full p-3">
            <label
              for="name"
              class="block uppercase tracking-wide font-bold mb-2 text-lg text-left"
            >
              Name
            </label>

            <Input
              id="name"
              name="name"
              type="text"
              value={props.cloudName || ""}
              required
              placeholder="Enter cloud name"
              class="appearance-none block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none focus:border-blue-500"
            />
          </div>

          <div class="w-full p-3">
            <label
              for="description"
              class="block uppercase tracking-wide font-bold mb-2 text-lg text-left"
            >
              Description
            </label>

            <Input
              id="description"
              name="description"
              type="text"
              value={props.cloudDescription || ""}
              multiline
              required
              placeholder="Enter cloud description"
              class="appearance-none block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none focus:border-blue-500"
            />
          </div>

          <div class="w-full p-3">
            <label
              for="tenant-id"
              class="block uppercase tracking-wide font-bold mb-2 text-lg text-left"
            >
              Tenant ID
            </label>

            <Input
              id="tenant-id"
              name="tenant-id"
              type="text"
              value={props.cloudTenantID || ""}
              required
              placeholder="Enter tenant ID"
              class="appearance-none block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none focus:border-blue-500"
            />
          </div>

          <div class="w-full p-3">
            <label
              for="subscription-id"
              class="block uppercase tracking-wide font-bold mb-2 text-lg text-left"
            >
              Subscription ID
            </label>

            <Input
              id="subscription-id"
              name="subscription-id"
              type="text"
              value={props.cloudSubscriptionID || ""}
              required
              placeholder="Enter subscription ID"
              class="appearance-none block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none focus:border-blue-500"
            />
          </div>

          <div class="w-full p-3">
            <label
              for="application-id"
              class="block uppercase tracking-wide font-bold mb-2 text-lg text-left"
            >
              Application ID
            </label>

            <Input
              id="application-id"
              name="application-id"
              type="text"
              value={props.cloudApplicationID || ""}
              required
              placeholder="Enter application ID"
              class="appearance-none block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none focus:border-blue-500"
            />
          </div>

          <div class="w-full p-3">
            <label
              for="auth-key"
              class="block uppercase tracking-wide font-bold mb-2 text-lg text-left"
            >
              Application Auth Key
            </label>

            <Input
              id="auth-key"
              name="auth-key"
              type="text"
              value={props.cloudAuthKey || ""}
              required
              placeholder="Enter application auth key"
              class="appearance-none block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <ActionGroup class="mt-8 flex-col">
        <>
          <Action
            type="submit"
            class="w-full md:w-auto text-white font-bold m-1 py-2 px-4 rounded focus:outline-none shadow-lg"
          >
            Connect Subscription
          </Action>
        </>
      </ActionGroup>
    </form>
  );
}
