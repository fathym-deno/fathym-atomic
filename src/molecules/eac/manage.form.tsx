import {
  Action,
  ActionGroup,
  classSet,
  Input,
  type JSX,
} from "../../src.deps.ts";

export type EaCManageFormProps = {
  entLookup?: string;

  entName?: string;

  entDescription?: string;

  hideTitle?: boolean;

  titleContext?: string;
} & JSX.HTMLAttributes<HTMLFormElement>;

export function EaCManageForm(props: EaCManageFormProps): JSX.Element {
  const title = props.titleContext || "Enterprise";

  return (
    <form
      method="post"
      action="/api/eac"
      {...props}
      class={classSet(
        ["-:w-full -:max-w-sm -:md:max-w-md -:mx-auto -:py-3 -:mt-8"],
        props,
      )}
    >
      <div class="flex flex-wrap -mx-3 mb-4">
        <div class="w-full px-3">
          {!props.hideTitle && (
            <label
              for="subscription-plan"
              class="block uppercase tracking-wide font-bold mb-2 text-xl text-center"
            >
              {props.entLookup ? "Edit" : "Create"} {title}
            </label>
          )}

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
              value={props.entName || ""}
              required
              placeholder={`Enter ${title.toLowerCase()} name`}
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
              value={props.entDescription || ""}
              multiline
              required
              placeholder={`Enter ${title.toLowerCase()} description`}
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
            {props.entLookup ? "Save" : "Create"} {title}
          </Action>
        </>
      </ActionGroup>
    </form>
  );
}
