import { JSX } from "preact";
import { Action, ActionGroup, classSet, Input } from "../../src.deps.ts";
import { useEffect, useState } from "preact/hooks";
import { DataLookup } from "../../utils/DataLookup.ts";

export type EaCManageSecretFormProps = {
  cloudOptions: DataLookup[];
  entLookup: string;
  keyVaultOptions: {
    [cloudLookup: string]: DataLookup[];
  };
  secretLookup?: string;
  secretName?: string;
  secretDescription?: string;
  secretValue?: string;
  secretCloudLookup?: string;
  secretKeyVaultLookup?: string;
} & JSX.HTMLAttributes<HTMLFormElement>;

export function EaCManageSecretForm(props: EaCManageSecretFormProps) {
  const [curCloudLookup, setCurCloudLookup] = useState(
    props.secretCloudLookup || "",
  );

  const cloudChanged = (e: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
    setCurCloudLookup(e.currentTarget.value);
  };

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
          <label class="block uppercase tracking-wide font-bold mb-2 text-xl text-center">
            {props.secretLookup ? "Edit" : "Create"} EaC Secrets
          </label>

          <Input
            id="entLookup"
            name="entLookup"
            type="hidden"
            value={props.entLookup}
          />

          <div class="w-full p-3">
            <label
              for="secretLookup"
              class="block uppercase tracking-wide font-bold mb-2 text-lg text-left"
            >
              Secret Lookup
            </label>

            <Input
              id="secretLookup"
              name="secretLookup"
              type="text"
              value={props.secretLookup || ""}
              required
              placeholder="Enter EaC secret lookup"
              class="appearance-none block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none focus:border-blue-500"
            />
          </div>

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
              value={props.secretName || ""}
              required
              placeholder="Enter EaC secret name"
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
              value={props.secretDescription || ""}
              multiline
              required
              placeholder="Enter EaC secret description"
              class="appearance-none block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none focus:border-blue-500"
            />
          </div>

          <div class="w-full p-3">
            <label
              for="value"
              class="block uppercase tracking-wide font-bold mb-2 text-lg text-left"
            >
              Value
            </label>

            <Input
              id="value"
              name="value"
              type="text"
              value={props.secretValue || ""}
              multiline
              placeholder="Enter EaC secret value"
              class="appearance-none block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none focus:border-blue-500"
            />
          </div>

          <div class="w-full p-3">
            <label
              for="cloudLookup"
              class="block uppercase tracking-wide font-bold mb-2 text-lg text-left"
            >
              Cloud
            </label>

            <select
              id="cloudLookup"
              name="cloudLookup"
              type="text"
              value={props.secretCloudLookup || ""}
              required
              onChange={cloudChanged}
              placeholder="Enter EaC secret cloud"
              class="appearance-none block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none focus:border-blue-500"
            >
              <option value="">-- Select EaC cloud --</option>
              {props.cloudOptions.map((option) => {
                return <option value={option.Lookup}>{option.Name}</option>;
              })}
            </select>
          </div>

          <div class="w-full p-3">
            <label
              for="keyVaultLookup"
              class="block uppercase tracking-wide font-bold mb-2 text-lg text-left"
            >
              Key Vault
            </label>

            <select
              id="keyVaultLookup"
              name="keyVaultLookup"
              type="text"
              value={props.secretKeyVaultLookup || ""}
              disabled={!curCloudLookup}
              required
              placeholder="Enter EaC secret key vault"
              class="appearance-none block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none focus:border-blue-500"
            >
              <option value="">-- Select EaC key vault --</option>
              {curCloudLookup &&
                props.keyVaultOptions[curCloudLookup].map((option) => {
                  return <option value={option.Lookup}>{option.Name}</option>;
                })}
            </select>
          </div>
        </div>
      </div>

      <ActionGroup class="mt-8 flex-col">
        <>
          <Action
            type="submit"
            class="w-full md:w-auto text-white font-bold m-1 py-2 px-4 rounded focus:outline-none shadow-lg"
          >
            {props.secretLookup ? "Save" : "Create"} EaC Secret
          </Action>
        </>
      </ActionGroup>
    </form>
  );
}
