import {
  classSet,
  Icon,
  Input,
  InputProps,
  JSX,
  useRef,
  useState,
} from "../src.deps.ts";

export const IsIsland = true;

export type CopyInputProps = {
  icons?: {
    CheckIcon?: string;

    CopyIcon?: string;

    IconSet?: string;
  };
} & InputProps;

export default function CopyInput(props: CopyInputProps) {
  const copyRef = useRef<HTMLInputElement>(null);

  const [success, setSuccess] = useState(false);

  const copyToClipboard = (_e: JSX.TargetedMouseEvent<HTMLButtonElement>) => {
    setSuccess(true);

    navigator.clipboard.writeText(props.value!.toString());

    setTimeout(() => setSuccess(false), 2500);
  };

  return (
    <div class="flex flex-row items-center">
      <Input
        type="text"
        {...props}
        class={classSet(["-:flex-1"], props)}
        disabled
        ref={copyRef}
      />

      <Input {...props} type="hidden" />

      <button
        type="button"
        class="flex-none ml-2 text-lg"
        onClick={copyToClipboard}
      >
        <Icon
          class={classSet([
            "w-6 h-6 text-green-500",
            success ? "block" : "hidden",
          ])}
          src={props.icons?.IconSet || "/icons/iconset"}
          icon={props.icons?.CheckIcon || "check"}
        />

        <Icon
          class={classSet(["w-6 h-6", !success ? "block" : "hidden"])}
          src={props.icons?.IconSet || "/icons/iconset"}
          icon={props.icons?.CopyIcon || "copy"}
        />
      </button>
    </div>
  );
}
