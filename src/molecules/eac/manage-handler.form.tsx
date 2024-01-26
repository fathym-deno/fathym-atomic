import { JSX } from "preact";
import { Action, ActionGroup, classSet, Input } from "../../src.deps.ts";

export type EaCManageHandlerFormProps = {
  entLookup: string;
  handlerLookup?: string;
  handlerOrder?: number;
  handlerApiPath?: string;
} & JSX.HTMLAttributes<HTMLFormElement>;

export function EaCManageHandlerForm(props: EaCManageHandlerFormProps) {
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
            {props.handlerLookup ? "Edit" : "Create"} EaC Handler
          </label>

          <Input
            id="entLookup"
            name="entLookup"
            type="hidden"
            value={props.entLookup}
          />

          <div class="w-full p-3">
            <label
              for="handlerLookup"
              class="block uppercase tracking-wide font-bold mb-2 text-lg text-left"
            >
              Handler Lookup
            </label>

            <Input
              id="handlerLookup"
              name="handlerLookup"
              type="text"
              value={props.handlerLookup || ""}
              required
              placeholder="Enter EaC handler lookup"
              class="appearance-none block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none focus:border-blue-500"
            />
          </div>

          <div class="w-full p-3">
            <label
              for="apiPath"
              class="block uppercase tracking-wide font-bold mb-2 text-lg text-left"
            >
              API Path
            </label>

            <Input
              id="apiPath"
              name="apiPath"
              type="url"
              value={props.handlerApiPath || ""}
              required
              placeholder="Enter EaC handler API Path"
              class="appearance-none block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none focus:border-blue-500"
            />
          </div>

          <div class="w-full p-3">
            <label
              for="order"
              class="block uppercase tracking-wide font-bold mb-2 text-lg text-left"
            >
              Order
            </label>

            <Input
              id="order"
              name="order"
              type="text"
              value={props.handlerOrder || 100}
              required
              placeholder="Enter EaC handler order"
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
            {props.handlerLookup ? "Save" : "Create"} EaC Handler
          </Action>
        </>
      </ActionGroup>
    </form>
  );
}
