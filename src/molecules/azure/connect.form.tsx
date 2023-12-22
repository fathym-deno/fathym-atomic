import { JSX } from 'preact';
import { Action, ActionGroup, classSet } from '../../src.deps.ts';

export type CloudConnectAzureFormProps = {
  actionText?: string;

  description?: string;

  title?: string;
} & Omit<JSX.HTMLAttributes<HTMLFormElement>, "title">;

export function CloudConnectAzureForm(
  props: CloudConnectAzureFormProps
) {
  const title = props.title || 'Connect to Azure';

  const description =
    props.description ||
    'To get started in the cloud, please connect your Azure account.';

    const actionText = props.actionText || 'Connect Now';

  return (
    <form
      action="/cloud/azure/auth/signin"
      {...props}
      class={classSet(props, 'w-full max-w-sm md:max-w-md mx-auto py-3 mt-8')}
    >
      <div class="flex flex-wrap -mx-3 mb-4">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide font-bold mb-2 text-xl">
            {title}
          </label>

          <p class="text-lg">{description}</p>
        </div>
      </div>

      <ActionGroup class="mt-8 flex-col">
        <>
          <Action
            type="submit"
            class="w-full md:w-auto text-white font-bold m-1 py-2 px-4 rounded focus:outline-none shadow-lg"
          >
            {actionText}
          </Action>
        </>
      </ActionGroup>
    </form>
  );
}
