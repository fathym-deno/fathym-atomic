import { JSX } from "preact";
import { Action, ActionGroup, classSet, Input } from "../../src.deps.ts";

export type EaCManageIoTDeviceFormProps = {
  entLookup: string;
  iotLookup: string;
  deviceLookup?: string;
  deviceName?: string;
  deviceDescription?: string;
  deviceIsIoTEdge?: boolean;
} & JSX.HTMLAttributes<HTMLFormElement>;

export function EaCManageIoTDeviceForm(props: EaCManageIoTDeviceFormProps) {
  return (
    <form
      method="post"
      {...props}
      class={classSet(props, "w-full max-w-sm md:max-w-md mx-auto py-3 mt-8")}
    >
      <div class="flex flex-wrap -mx-3 mb-4">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide font-bold mb-2 text-xl text-center">
            {props.deviceLookup ? "Edit" : "Create"} EaC IoT Device
          </label>

          <Input
            id="entLookup"
            name="entLookup"
            type="hidden"
            value={props.entLookup}
          />

          <Input
            id="iotLookup"
            name="iotLookup"
            type="hidden"
            value={props.iotLookup}
          />

          <div class="w-full p-3">
            <label
              for="deviceLookup"
              class="block uppercase tracking-wide font-bold mb-2 text-lg text-left"
            >
              IoT Device Lookup
            </label>

            <Input
              id="deviceLookup"
              name="deviceLookup"
              type="text"
              value={props.deviceLookup || ""}
              required
              placeholder="Enter EaC device lookup"
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
              value={props.deviceName || ""}
              required
              placeholder="Enter EaC device name"
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
              value={props.deviceDescription || ""}
              multiline
              required
              placeholder="Enter EaC device description"
              class="appearance-none block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none focus:border-blue-500"
            />
          </div>

          <div class="w-full p-3">
            {
              /* <label class="block uppercase tracking-wide font-bold mb-2 text-xl">
            IoT Edge Device?
          </label> */
            }

            <div class="flex items-center mb-2">
              <Input
                id="isIoTEdge"
                name="isIoTEdge"
                type="checkbox"
                value="isIoTEdge"
                checked={props.deviceIsIoTEdge}
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />

              <label for="isIoTEdge" class="ms-2 text-sm font-medium pl-3">
                Is IoT Edge Device?
              </label>
            </div>
          </div>
        </div>
      </div>

      <ActionGroup class="mt-8 flex-col">
        <>
          <Action
            type="submit"
            class="w-full md:w-auto text-white font-bold m-1 py-2 px-4 rounded focus:outline-none shadow-lg"
          >
            {props.deviceLookup ? "Save" : "Create"} EaC IoT Device
          </Action>
        </>
      </ActionGroup>
    </form>
  );
}
