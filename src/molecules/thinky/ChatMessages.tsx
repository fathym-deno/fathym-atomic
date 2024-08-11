import {
  classSet,
  gfmRender,
  Icon,
  type JSX,
  type Signal,
  useEffect,
  useRef,
} from "../../src.deps.ts";
import {
  AIMessage,
  AIMessageChunk,
  type BaseMessage,
  HumanMessage,
  HumanMessageChunk,
} from "npm:@langchain/core@0.2.23/messages";

export const IsIsland = true;

export type ChatMessagesProps = {
  icons?: {
    LoadingIcon?: string;

    IconSet?: string;
  };

  messages: Signal<BaseMessage[]>;

  sending?: Signal<boolean>;
} & JSX.HTMLAttributes<HTMLDivElement>;

export default function ChatMessages(props: ChatMessagesProps): JSX.Element {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // if (chatContainerRef.current) {
    //   const chatContainer = chatContainerRef.current;

    //   const isAtBottom = chatContainer.scrollHeight === chatContainer.scrollTop;

    //   if (isAtBottom) {
    //     chatContainer.scrollTop = chatContainer.scrollHeight;
    //   }
    // }
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [props.messages.value, props.sending?.value]);

  const lastMsg = props.messages.value.slice(-1)[0];

  const useAiPlaceholder = (!lastMsg ||
    !(lastMsg instanceof AIMessage || lastMsg instanceof AIMessageChunk)) &&
    props.sending?.value;

  return (
    <div
      {...props}
      class={classSet(["-:flex-grow -:overflow-y-auto"], props)}
      ref={chatContainerRef}
    >
      {props.messages.value.map((message, index) => {
        const messageText = gfmRender((message.content || "").toString());

        const isAiMsg = message instanceof AIMessage ||
          message instanceof AIMessageChunk;

        const isHumanMsg = message instanceof HumanMessage ||
          message instanceof HumanMessageChunk;

        return (
          <div
            key={index}
            class={classSet([
              `flex my-4 relative`,
              isAiMsg ? "" : "justify-end",
            ])}
          >
            {isAiMsg && (
              <div class="flex-shrink-0 w-12 h-12 bg-blue-600 dark:bg-blue-800 text-white rounded-full flex items-center justify-center mr-4 sticky top-0">
                <div class="relatvie">
                  <div class="text-center w-12 h-12 leading-[3rem]">🐙</div>

                  {!useAiPlaceholder &&
                    message === lastMsg &&
                    props.sending?.value && (
                    <Icon
                      class="absolute w-12 h-12 top-0 animate-spin"
                      src={props.icons?.IconSet || "/icons/iconset"}
                      icon={props.icons?.LoadingIcon || "loading"}
                    />
                  )}
                </div>
              </div>
            )}

            {(isHumanMsg || isAiMsg) && (
              <div
                data-color-mode="dark"
                data-dark-theme="dark"
                class={classSet([
                  "p-4 rounded-lg text-lg max-w-xs whitespace-pre-wrap overflow-y-auto",
                  "markdown-body",
                  isAiMsg
                    ? "bg-blue-100 dark:bg-blue-700 dark:text-white ml-1" // text-right
                    : "bg-gray-100 dark:bg-slate-700 dark:text-white mr-1",
                ])}
                dangerouslySetInnerHTML={{ __html: messageText }}
              >
              </div>
            )}

            {isHumanMsg && (
              <div class="flex-shrink-0 w-12 h-12 bg-gray-300 dark:bg-slate-600 text-white rounded-full flex items-center justify-center ml-4 sticky top-0">
                🧑
              </div>
            )}
          </div>
        );
      })}

      {useAiPlaceholder && (
        <div class={`flex my-4 `}>
          <div class="flex-shrink-0 w-12 h-12 bg-blue-600 dark:bg-blue-800 text-white rounded-full flex items-center justify-center mr-4">
            <div class="relatvie">
              <div class="text-center w-12 h-12 leading-[3rem]">🐙</div>

              <Icon
                class="absolute w-12 h-12 top-0 animate-spin"
                src={props.icons?.IconSet || "/icons/iconset"}
                icon={props.icons?.LoadingIcon || "loading"}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
