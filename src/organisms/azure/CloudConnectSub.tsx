import { type JSX, type Tab, Tabs, useState } from "../../src.deps.ts";
import CloudConnectNewSubForm from "../../molecules/azure/CloudConnectNewSubForm.tsx";
import { CloudConnectExistingForm } from "../../molecules/azure/CloudConnectExistingForm.tsx";
import { EaCManageCloudForm } from "../../molecules/eac/manage-cloud.form.tsx";

export const IsIsland = true;

export type CloudConnectSubProps = {
  billingScopes: Record<string, string>;

  cloudAction: string;

  subAction: string;

  subs: Record<string, string>;

  tenants: Record<string, string>;
};

export default function CloudConnectSub(
  props: CloudConnectSubProps,
): JSX.Element {
  const initState = Object.keys(props.subs || {})?.length > 0
    ? "existing"
    : "new";

  const [currentDisplay, setUseExisting] = useState(
    initState as "existing" | "new" | "direct",
  );

  const _switchTo = (display: typeof currentDisplay) => {
    setUseExisting(display);
  };

  const tabs: Tab[] = [
    {
      label: "Create New",
      content: (
        <CloudConnectNewSubForm
          action={props.subAction}
          data-eac-bypass-base
          billingScopes={props.billingScopes}
          tenants={props.tenants}
        />
      ),
    },
    {
      label: "Bring Your Own",
      content: (
        <EaCManageCloudForm action={props.cloudAction} data-eac-bypass-base />
      ),
    },
  ];

  if (initState === "existing") {
    tabs.unshift({
      label: "Use Existing",
      content: (
        <CloudConnectExistingForm action={props.subAction} subs={props.subs} />
      ),
    });
  }

  return (
    <div class="flex flex-col justify-center">
      <Tabs class="mt-16" tabsDisplay="stretch" tabs={tabs} />
    </div>
  );
}
