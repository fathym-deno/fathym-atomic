import {
  Action,
  ActionGroup,
  ActionStyleTypes,
  EaCStatus,
  EaCStatusProcessingTypes,
  Icon,
  Input,
  JSX,
  UserEaCRecord,
} from "../../src.deps.ts";

export const IsIsland = true;

export type EnterpriseManagementItemProps = {
  active: boolean;

  enterprise: UserEaCRecord;

  icons?: {
    BeginIcon?: string;

    DeleteIcon?: string;

    IconSet?: string;
  };
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
      fetch("", {
        method: "DELETE",
        body: JSON.stringify({
          EnterpriseLookup: props.enterprise.EnterpriseLookup,
        }),
      }).then((response) => {
        response.json().then((status: EaCStatus) => {
          if (status.Processing === EaCStatusProcessingTypes.COMPLETE) {
            location.reload();
          } else {
            console.log(status);
            alert(status.Messages["Error"]);
          }
        });
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
      // deleteFormRef.
      fetch("", {
        method: "PUT",
        body: JSON.stringify({
          EnterpriseLookup: props.enterprise.EnterpriseLookup,
        }),
      }).then((response) => {
        response.json().then((status: EaCStatus) => {
          if (status.Processing === EaCStatusProcessingTypes.COMPLETE) {
            location.reload();
          } else {
            console.log(status);
            alert(status.Messages["Error"]);
          }
        });
      });
    }
  };

  return (
    <div class="flex flex-row justify-center items-center hover:bg-slate-300 hover:opactity-80">
      <h1 class="flex-1 text-lg ml-1">{props.enterprise.EnterpriseName}</h1>

      <ActionGroup class="flex-none">
        <>
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
