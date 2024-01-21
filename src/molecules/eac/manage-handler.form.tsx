import { JSX } from "preact";
import { Action, ActionGroup, classSet, Input } from "../../src.deps.ts";

export type EaCManageHandlerFormProps = {
  entLookup?: string;
  handlerName?: string;
  handlerDescription?: string;
  handlerApiUrl?: string;
} & JSX.HTMLAttributes<HTMLFormElement>;

export function EaCManageHandler(props: EaCManageHandlerFormProps) {
  return (
    <form
      method="post"
      {...props}
      class={classSet(props, "w-full max-w-sm md:max-w-md mx-auto py-3 mt-8")}
    >
      <div class="flex flex-wrap -mx-3 mb-4">
        <div class="w-full px-3">
          <label
            for="subscription-plan"
            class="block uppercase tracking-wide font-bold mb-2 text-xl text-center"
          >
            {props.entLookup ? "Edit" : "Create"} EaC Handler
          </label>

          {props.entLookup && (
            <Input
              id="entLookup"
              name="entLookup"
              type="hidden"
              value={props.entLookup}
            />
          )}

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
              value={props.handlerName || ""}
              required
              placeholder="Enter EaC handler name"
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
              value={props.handlerDescription || ""}
              multiline
              required
              placeholder="Enter EaC handler description"
              class="appearance-none block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none focus:border-blue-500"
            />
          </div>

          <div class="w-full p-3">
            <label
              for="description"
              class="block uppercase tracking-wide font-bold mb-2 text-lg text-left"
            >
              API URL
            </label>

            <Input
              id="apiUrl"
              name="apiUrl"
              type="text"
              value={props.handlerApiUrl || ""}
              multiline
              required
              placeholder="Enter EaC handler API URL"
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
            {props.entLookup ? "Save" : "Create"} EaC Handler
          </Action>
        </>
      </ActionGroup>
    </form>
  );
}