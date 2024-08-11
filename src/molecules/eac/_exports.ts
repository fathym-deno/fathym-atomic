import type { JSX } from "../../src.deps.ts";
import type { EnterpriseManagementItemProps } from "./EnterpriseManagementItem.tsx";
import type { EaCManageIoTFormProps } from "./manage-iot.form.tsx";
import type { EaCManageSecretFormProps } from "./manage-secret.form.tsx";
import type { EaCManageSourceFormProps } from "./manage-source.form.tsx";

export * from "./calz.form.tsx";
export { type EnterpriseManagementItemProps } from "./EnterpriseManagementItem.tsx";
export * from "./manage.form.tsx";
export * from "./manage-cloud.form.tsx";
export * from "./manage-devops-action.form.tsx";
export * from "./manage-handler.form.tsx";
export { type EaCManageIoTFormProps } from "./manage-iot.form.tsx";
export * from "./manage-iot-device.form.tsx";
export { type EaCManageSecretFormProps } from "./manage-secret.form.tsx";
export { type EaCManageSourceFormProps } from "./manage-source.form.tsx";

export const EnterpriseManagementItem: (
  props: EnterpriseManagementItemProps,
) => JSX.Element = (await import("./EnterpriseManagementItem.tsx")).default;

export const EaCManageIoTForm: (props: EaCManageIoTFormProps) => JSX.Element = (
  await import("./manage-iot.form.tsx")
).default;

export const EaCManageSecretForm: (
  props: EaCManageSecretFormProps,
) => JSX.Element = (await import("./manage-secret.form.tsx")).default;

export const EaCManageSourceForm: (
  props: EaCManageSourceFormProps,
) => JSX.Element = (await import("./manage-source.form.tsx")).default;
