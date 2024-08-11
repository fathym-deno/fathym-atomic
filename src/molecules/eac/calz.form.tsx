import type { JSX } from "../../src.deps.ts";
import type { Location } from "npm:@azure/arm-subscriptions@5.1.0";
import {
  Action,
  ActionGroup,
  classSet,
  Input,
  Select,
} from "../../src.deps.ts";

export type CloudCALZFormProps = JSX.HTMLAttributes<HTMLFormElement> & {
  cloudLookup: string;

  locations: Location[];

  resGroupLookup?: string;
};

export function CloudCALZForm(props: CloudCALZFormProps): JSX.Element {
  return (
    <form
      method="post"
      action="/api/eac/clouds/resource-groups"
      {...props}
      class={classSet(
        ["-:w-full -:max-w-sm -:md:max-w-md -:mx-auto -:p-3 -:mt-8"],
        props,
      )}
    >
      <div class="flex flex-wrap -mx-3 mb-4 text-left">
        <Input
          id="cloudLookup"
          name="cloudLookup"
          type="hidden"
          value={props.cloudLookup}
        />

        <div class="w-full px-3">
          <label
            for="resGroupLookup"
            class="block uppercase tracking-wide font-bold mb-2 text-xl"
          >
            Resource Group Lookup
          </label>

          <Input
            id="resGroupLookup"
            name="resGroupLookup"
            type="text"
            required
            disabled={!!props.resGroupLookup}
            placeholder="Enter new resource group lookup"
          />
        </div>

        <div class="w-full p-3">
          <label
            for="description"
            class="block uppercase tracking-wide font-bold mb-2 text-xl"
          >
            Description
          </label>

          <Input
            id="description"
            name="description"
            type="text"
            required
            multiline
            placeholder="Enter new resource group description"
          />
        </div>

        <div class="w-full px-3">
          <label
            for="location"
            class="block uppercase tracking-wide font-bold mb-2 text-xl"
          >
            Location
          </label>

          <Select id="location" name="location" required>
            <option value="">-- Select a location --</option>

            {props.locations.map((location) => {
              return (
                <option value={location.name}>{location.displayName}</option>
              );
            })}
          </Select>
        </div>
      </div>

      <ActionGroup class="mt-8 flex-col">
        <>
          <Action
            type="submit"
            class="w-full md:w-auto text-white font-bold m-1 py-2 px-4 rounded focus:outline-none shadow-lg"
          >
            Create CALZ
          </Action>
        </>
      </ActionGroup>
    </form>
  );
}
