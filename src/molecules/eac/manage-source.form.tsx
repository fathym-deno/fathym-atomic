// deno-lint-ignore-file jsx-no-useless-fragment
import {} from "preact/hooks";
import {
  Action,
  ActionGroup,
  classSet,
  Input,
  type JSX,
  Select,
  useState,
} from "../../src.deps.ts";
import type { DataLookup } from "../../utils/DataLookup.ts";

export const IsIsland = true;

export type EaCManageSourceFormProps = {
  entLookup: string;
  organizationOptions: string[];
  // repositoryOptions: {
  //   [cloudLookup: string]: string[];
  // };
  secretOptions: DataLookup[];
  sourceLookup?: string;
  sourceName?: string;
  sourceDescription?: string;
  sourceOrgnaization?: string;
  sourceRepository?: string;
  sourceSecrets?: DataLookup[];
} & JSX.HTMLAttributes<HTMLFormElement>;

export default function EaCManageSourceForm(
  props: EaCManageSourceFormProps,
): JSX.Element {
  const actionOptions: DataLookup[] = [
    {
      Lookup: "configure",
      Name: "Configure",
    },
    {
      Lookup: "fork",
      Name: "Fork",
    },
    // {
    //   Lookup: 'import',
    //   Name: 'Import',
    // },
    {
      Lookup: "template",
      Name: "Template",
    },
  ];

  const [curAction, setCurAction] = useState("");

  const [curOrg, setCurOrg] = useState(props.sourceOrgnaization || "");

  const actionChanged = (e: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
    setCurAction(e.currentTarget.value);
  };

  const organizationChanged = (
    e: JSX.TargetedEvent<HTMLSelectElement, Event>,
  ) => {
    setCurOrg(e.currentTarget.value);
  };

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
            {props.sourceLookup ? "Manage" : "Create"} EaC Source
          </label>

          <Input
            id="entLookup"
            name="entLookup"
            type="hidden"
            value={props.entLookup}
          />

          {props.sourceLookup && (
            <label class="block uppercase tracking-wide font-bold mb-2 text-lg text-center">
              Source: {props.sourceOrgnaization}/{props.sourceRepository}
              <Input
                id="sourceLookup"
                name="sourceLookup"
                type="hidden"
                value={props.sourceLookup}
              />
              <Input
                id="org"
                name="org"
                type="hidden"
                value={props.sourceOrgnaization}
              />
              <Input
                id="repo"
                name="repo"
                type="hidden"
                value={props.sourceRepository}
              />
            </label>
          )}

          {!props.sourceLookup && (
            <div class="w-full p-3">
              <label
                for="action"
                class="block uppercase tracking-wide font-bold mb-2 text-lg text-left"
              >
                Source Action
              </label>

              <Select
                id="action"
                name="action"
                type="text"
                required
                onChange={actionChanged}
                placeholder="Enter EaC IoT cloud"
              >
                <option value="">-- Select Source action --</option>
                {actionOptions.map((option, i) => {
                  return (
                    <option key={i} value={option.Lookup}>{option.Name}</option>
                  );
                })}
              </Select>
            </div>
          )}

          {curAction && curAction !== "configure" && !props.sourceLookup && (
            <div class="w-full p-3">
              <label
                for="remote"
                class="block uppercase tracking-wide font-bold mb-2 text-lg text-left"
              >
                {curAction === "fork"
                  ? "Repository to Fork"
                  : curAction === "template"
                  ? "Template Repository"
                  : "Import Repository"}
              </label>

              <Input
                id="remote"
                name="remote"
                type="url"
                required
                placeholder="Enter EaC remote repository"
              />
            </div>
          )}

          {!props.sourceLookup && (
            <>
              <div class="w-full p-3">
                <label
                  for="org"
                  class="block uppercase tracking-wide font-bold mb-2 text-lg text-left"
                >
                  Into Organization
                </label>

                <Select
                  id="org"
                  name="org"
                  type="text"
                  value={curOrg || ""}
                  required
                  onChange={organizationChanged}
                  placeholder="Enter EaC source organization"
                >
                  <option value="">-- Select GitHub organization --</option>
                  {props.organizationOptions.map((option, i) => {
                    return <option key={i} value={option}>{option}</option>;
                  })}
                </Select>
              </div>

              {curAction && curAction != "fork" && (
                <div class="w-full p-3">
                  <label
                    for="repo"
                    class="block uppercase tracking-wide font-bold mb-2 text-lg text-left"
                  >
                    Repository
                  </label>

                  {
                    /* <Select
                    id="repo"
                    name="repo"
                    type="text"
                    value={props.sourceRepository || ''}
                    disabled={!curOrg}
                    required
                    placeholder="Enter EaC source repository"
                  >
                    <option value="">-- Select GitHub repository --</option>
                    {curOrg &&
                      props.repositoryOptions[curOrg].map((option) => {
                        return <option value={option}>{option}</option>;
                      })}
                  </Select> */
                  }

                  <Input
                    id="repo"
                    name="repo"
                    type="text"
                    value={props.sourceRepository || ""}
                    required
                    placeholder="Enter EaC source repository name"
                  />
                </div>
              )}
            </>
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
              value={props.sourceName || ""}
              required
              placeholder="Enter EaC source name"
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
              value={props.sourceDescription || ""}
              multiline
              required
              placeholder="Enter EaC source description"
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
            {props.sourceLookup ? "Save" : "Create"} EaC Source
          </Action>
        </>
      </ActionGroup>
    </form>
  );
}
