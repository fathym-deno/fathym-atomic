import {
  Action,
  ActionStyleTypes,
  classSet,
  type JSX,
  SlideToggle,
  useEffect,
  useState,
} from "../../src.deps.ts";
import type { ChatSet } from "./ChatSet.ts";
import type { ChatSets } from "./ChatSets.ts";

export const IsIsland = true;

export type ChatsProps = {
  activeChat?: string;

  chats: ChatSets;

  onActiveChatSet?: (chat: string | undefined) => void;
} & JSX.HTMLAttributes<HTMLDivElement>;

export default function Chats(props: ChatsProps): JSX.Element {
  const [activeChat, setActiveChat] = useState<string | undefined>();
  const [activeChatName, setActiveChatName] = useState<string | undefined>();
  const [chats, setChats] = useState<Record<string, ChatSet> | undefined>();
  const [isGroupsList, setIsGroupsList] = useState(false);

  useEffect(() => {
    setActiveChat(props.activeChat!);
  }, [props.activeChat]);

  useEffect(() => {
    const name = activeChat
      ? props.chats._?.[activeChat]?.Name ||
        props.chats.groups?.[activeChat]?.Name
      : undefined;

    setActiveChatName(name);

    const chats = (isGroupsList ? props.chats.groups : props.chats._) || {};

    setChats(chats);
  }, [activeChat]);

  const onSetActiveChat = (ac?: string): void => {
    setActiveChat(ac);

    props.onActiveChatSet?.(ac);
  };

  return (
    <div
      {...props}
      class={classSet(["-:flex -:flex-col -:p-2 -:max-w-sm"], props)}
    >
      {!activeChat
        ? (
          <>
            <div class="flex flex-row mb-2 mx-auto justify-center">
              <span class="mx-4">Chats</span>

              <SlideToggle
                checked={isGroupsList}
                onChange={() => setIsGroupsList(!isGroupsList)}
              >
                <span class="mx-4">Groups</span>
              </SlideToggle>
            </div>

            <div class="flex-grow overflow-y-auto">
              {Object.keys(chats || {}).map((chatId, index) => {
                const chat = chats![chatId];

                return (
                  <Action
                    actionStyle={ActionStyleTypes.Link}
                    key={index}
                    class="w-full text-left"
                    onClick={() => onSetActiveChat(chatId)}
                  >
                    {chat.Name}
                  </Action>
                );
              })}
            </div>
          </>
        )
        : (
          <>
            <div class="flex flex-row gap-2 mb-2 items-center">
              <Action
                actionStyle={ActionStyleTypes.Link}
                onClick={() => onSetActiveChat()}
              >
                {"<"}
                {/* Back to list */}
              </Action>

              <h2 class="flex-1 text-xl font-bold text-center">
                {activeChatName}
              </h2>
            </div>
          </>
        )}
    </div>
  );
}
