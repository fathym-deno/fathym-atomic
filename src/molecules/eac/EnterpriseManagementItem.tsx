import {
  Action,
  ActionGroup,
  ActionStyleTypes,
  Icon,
  Input,
  JSX,
} from "../../src.deps.ts";
// import { JSX } from "preact";
// import {
//   Action,
//   ActionGroup,
//   ActionStyleTypes,
// } from "https://deno.land/x/fathym_atomic@v0.0.137/mod.ts";
// import { Icon } from "https://deno.land/x/fathym_atomic_icons@v0.0.30/browser.ts";

export const IsIsland = true;

export type EnterpriseManagementItemProps = {
  active: boolean;

  deleteActionPath?: string;

  enterprise: {
    EnterpriseLookup: string;

    EnterpriseName: string;
  };

  icons?: {
    BeginIcon?: string;

    DeleteIcon?: string;

    EditIcon?: string;

    IconSet?: string;
  };

  manage: boolean;

  setActiveActionPath?: string;
};

export default function EnterpriseManagementItem(
  props: EnterpriseManagementItemProps,
) {
  const deleteEnterprise = (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();

    if (
      confirm(
        `Are you sure you want to delete ${props.enterprise.EnterpriseName}?`,
      )
    ) {
      // deleteFormRef.
      fetch(props.deleteActionPath ?? "", {
        method: "DELETE",
        body: JSON.stringify({
          EnterpriseLookup: props.enterprise.EnterpriseLookup,
        }),
      }).then((response) => {
        response
          .json()
          .then(
            (status: {
              Processing: number;
              Messages: Record<string, unknown>;
            }) => {
              if (status.Processing === 3) {
                location.reload();
              } else {
                console.log(status);
                alert(status.Messages["Error"]);
              }
            },
          );
      });
    }
  };

  const setActiveEnterprise = (
    e: JSX.TargetedEvent<HTMLFormElement, Event>,
  ) => {
    e.preventDefault();

    if (
      confirm(
        `Are you sure you want to set ${props.enterprise.EnterpriseName} as active?`,
      )
    ) {
      fetch(props.setActiveActionPath ?? "", {
        method: "PUT",
        body: JSON.stringify({
          EnterpriseLookup: props.enterprise.EnterpriseLookup,
        }),
      }).then((response) => {
        response
          .json()
          .then(
            (status: {
              Processing: number;
              Messages: Record<string, unknown>;
            }) => {
              if (status.Processing === 3) {
                location.reload();
              } else {
                console.log(status);
                alert(status.Messages["Error"]);
              }
            },
          );
      });
    }
  };

  return (
    <div class="flex flex-row justify-center items-center hover:bg-slate-300 hover:opactity-80">
      <h1 class="flex-1 text-lg ml-1">{props.enterprise.EnterpriseName}</h1>

      <ActionGroup class="flex-none">
        <>
          {!props.manage && (
            <Action
              actionStyle={ActionStyleTypes.Link |
                ActionStyleTypes.Rounded |
                ActionStyleTypes.Icon}
              href={`/enterprises/${props.enterprise.EnterpriseLookup}`}
            >
              <Icon
                class="w-6 h-6 text-blue-500"
                src={props.icons?.IconSet || "/icons/iconset"}
                icon={props.icons?.EditIcon || "edit"}
              />
            </Action>
          )}

          {!props.active && (
            <form onSubmit={(e) => setActiveEnterprise(e)}>
              <Action actionStyle={ActionStyleTypes.Link}>
                <Icon
                  class="w-6 h-6 text-sky-500"
                  src={props.icons?.IconSet || "/icons/iconset"}
                  icon={props.icons?.BeginIcon || "begin"}
                />
              </Action>
            </form>
          )}

          <form onSubmit={(e) => deleteEnterprise(e)}>
            <Action type="submit" actionStyle={ActionStyleTypes.Link}>
              <Icon
                class="w-6 h-6 text-red-500"
                src={props.icons?.IconSet || "/icons/iconset"}
                icon={props.icons?.DeleteIcon || "delete"}
              />
            </Action>
          </form>
        </>
      </ActionGroup>
    </div>
  );
}
