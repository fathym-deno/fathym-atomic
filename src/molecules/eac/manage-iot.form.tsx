import { JSX } from "preact";
import { Action, ActionGroup, classSet, Input } from "../../src.deps.ts";
import { useState } from "preact/hooks";
import { DataLookup } from "../../utils/DataLookup.ts";

export type EaCManageIoTFormProps = {
  cloudOptions: DataLookup[];
  entLookup: string;
  resGroupOptions: {
    [cloudLookup: string]: DataLookup[];
  };
  iotLookup?: string;
  iotName?: string;
  iotDescription?: string;
  iotCloudLookup?: string;
  iotResGroupLookup?: string;
} & JSX.HTMLAttributes<HTMLFormElement>;

export function EaCManageIoTForm(props: EaCManageIoTFormProps) {
  const [curCloudLookup, setCurCloudLookup] = useState(
    props.iotCloudLookup || "",
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
      )}
    >
      <div class="flex flex-wrap -mx-3 mb-4">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide font-bold mb-2 text-xl text-center">
            {props.iotLookup ? "Edit" : "Create"} EaC IoT
          </label>

          <Input
            id="entLookup"
            name="entLookup"
            type="hidden"
            value={props.entLookup}
          />

          <div class="w-full p-3">
            <label
              for="iotLookup"
              class="block uppercase tracking-wide font-bold mb-2 text-lg text-left"
            >
              IoT Lookup
            </label>

            <Input
              id="iotLookup"
              name="iotLookup"
              type="text"
              value={props.iotLookup || ""}
              required
              placeholder="Enter EaC IoT lookup"
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
              value={props.iotName || ""}
              required
              placeholder="Enter EaC iot name"
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
              value={props.iotDescription || ""}
              multiline
              required
              placeholder="Enter EaC iot description"
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
              value={props.iotCloudLookup || ""}
              required
              onChange={cloudChanged}
              placeholder="Enter EaC IoT cloud"
              class="appearance-none block w-full bg-white text-black border border-gray-400 hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none focus:border-blue-500"
            >
              <option value="">-- Select EaC cloud --</option>
              {props.cloudOptions.map((option) => {
                return <option value={option.Lookup}>{option.Name}</option>;
              })}
            </select>
          </div>

          <div class="w-full p-3">
            <label
              for="resGroupLookup"
              class="block uppercase tracking-wide font-bold mb-2 text-lg text-left"
            >
              Resource Group
            </label>

            <select
              id="resGroupLookup"
              name="resGroupLookup"
              type="text"
              value={props.iotResGroupLookup || ""}
              disabled={!curCloudLookup}
              required
              placeholder="Enter EaC IoT resource group"
              class="appearance-none block w-full bg-white text-black border border-gray-400 hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none focus:border-blue-500"
            >
              <option value="">-- Select EaC resource group --</option>
              {curCloudLookup &&
                props.resGroupOptions[curCloudLookup].map((option) => {
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
            {props.iotLookup ? "Save" : "Create"} EaC IoT
          </Action>
        </>
      </ActionGroup>
    </form>
  );
}
