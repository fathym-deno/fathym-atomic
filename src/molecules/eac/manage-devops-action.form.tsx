import {
  Action,
  ActionGroup,
  classSet,
  Input,
  type JSX,
} from "../../src.deps.ts";

export type EaCManageDevOpsActionFormProps = {
  entLookup: string;
  doaLookup?: string;
  doaName?: string;
  doaDescription?: string;
  doaPath?: string;
  doaTemplatePaths?: string[];
} & JSX.HTMLAttributes<HTMLFormElement>;

export function EaCManageDevOpsActionForm(
  props: EaCManageDevOpsActionFormProps,
): JSX.Element {
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
          <label class="block uppercase tracking-wide font-bold mb-2 text-xl text-center">
            {props.doaLookup ? "Edit" : "Create"} EaC DevOps Actions
          </label>

          <Input
            id="entLookup"
            name="entLookup"
            type="hidden"
            value={props.entLookup}
          />

          <div class="w-full p-3">
            <label
              for="doaLookup"
              class="block uppercase tracking-wide font-bold mb-2 text-lg text-left"
            >
              DevOps Action Lookup
            </label>

            <Input
              id="doaLookup"
              name="doaLookup"
              type="text"
              value={props.doaLookup || ""}
              required
              placeholder="Enter EaC devops action lookup"
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
              value={props.doaName || ""}
              required
              placeholder="Enter EaC devops action name"
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
              value={props.doaDescription || ""}
              multiline
              required
              placeholder="Enter EaC devops action description"
            />
          </div>

          <div class="w-full p-3">
            <label
              for="path"
              class="block uppercase tracking-wide font-bold mb-2 text-lg text-left"
            >
              Path
            </label>

            <p>Will be stored at path in the `.github/workflows` folder.</p>

            <Input
              id="path"
              name="path"
              type="text"
              value={props.doaPath || ""}
              required
              placeholder="Enter EaC devops action path"
            />
          </div>

          <div class="w-full p-3">
            <label
              for="templatePaths"
              class="block uppercase tracking-wide font-bold mb-2 text-lg text-left"
            >
              Template Paths
            </label>

            <p>Put each template path on a new line.</p>

            <Input
              id="templatePaths"
              name="templatePaths"
              value={props.doaTemplatePaths?.join("\n") || ""}
              multiline
              required
              placeholder="Enter EaC devops action template paths"
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
            {props.doaLookup ? "Save" : "Create"} EaC DevOps Action
          </Action>
        </>
      </ActionGroup>
    </form>
  );
}
