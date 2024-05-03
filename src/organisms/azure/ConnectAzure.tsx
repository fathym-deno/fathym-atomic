import CloudConnectAzureForm from "../../molecules/azure/CloudConnectAzureForm.tsx";
import CloudConnectSub from "./CloudConnectSub.tsx";

export type ConnectAzureProps = {
  billingScopes: Record<string, string>;

  cloudAction: string;

  isConnected: boolean;

  oauthAction: string;

  subAction: string;

  subs: Record<string, string>;

  tenants: Record<string, string>;
};

export default function ConnectAzure(props: ConnectAzureProps) {
  return (
    <div class="flex flex-col justify-center w-full max-w-sm">
      {!props.isConnected
        ? (
          <CloudConnectAzureForm
            title={undefined}
            action={props.oauthAction}
            data-eac-bypass-base
          >
          </CloudConnectAzureForm>
        )
        : (
          <CloudConnectSub
            cloudAction={props.cloudAction}
            subAction={props.subAction}
            billingScopes={props.billingScopes}
            subs={props.subs}
            tenants={props.tenants}
          />
        )}
    </div>
  );
}
