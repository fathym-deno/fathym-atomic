import { ComponentChildren, JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import { useSignal } from "../../src.deps.ts";
import {
  AIMessage,
  AIMessageChunk,
  BaseMessage,
  HumanMessage,
} from "npm:@langchain/core/messages";
import { RemoteRunnable } from "npm:@langchain/core/runnables/remote";
import { StringPromptValue } from "npm:@langchain/core/prompt_values";
import { ChatSet } from "./ChatSet.ts";
import { ChatSets } from "./ChatSets.ts";
import Chats from "./Chats.tsx";
import ChatMessages from "./ChatMessages.tsx";
import ChatInput from "./ChatInput.tsx";

export const IsIsland = true;

export type ThinkyProps = {
  activeChat?: string;

  chats: Record<string, ChatSet>;

  children: ComponentChildren;

  groupChats?: string[];

  hideChatHeader?: boolean;

  jwt: string;

  root: string;

  streamEvents?: string[];
} & JSX.HTMLAttributes<HTMLDivElement>;

export default function Thinky(props: ThinkyProps) {
  const [activeChat, setActiveChat] = useState(props.activeChat);

  const [chats, setChats] = useState<ChatSets>();

  const messages = useSignal<BaseMessage[]>([]);

  const sending = useSignal(!props.activeChat);

  const activeChatDef = activeChat ? props.chats[activeChat] : undefined;

  const circuit = activeChatDef
    ? new RemoteRunnable({
      url: `${props.root}${activeChatDef.CircuitLookup}`,
      options: {
        headers: { Authorization: `Bearer ${props.jwt}` },
      },
    })
    : undefined;

  if (!props.streamEvents?.length) {
    props.streamEvents = ["on_chat_model_stream", "on_llm_stream"]; //, "on_chain_stream"];
  }

  const processMessageChunk = (chunk: StringPromptValue | AIMessageChunk) => {
    const chunkValue = chunk instanceof AIMessageChunk
      ? chunk.content.toString()
      : typeof chunk === "string"
      ? chunk
      : chunk.value;

    if (chunkValue) {
      let lastMsg = messages.value.slice(-1)[0];

      if (!(lastMsg instanceof AIMessage)) {
        messages.value = [...messages.value, new AIMessage("")];

        lastMsg = messages.value.slice(-1)[0];
      }

      lastMsg.content += chunkValue;

      setTimeout(
        () => (messages.value = [...messages.value.slice(0, -1), lastMsg]),
        0,
      );
    }
  };

  const processThinkyEvent = (eventName: string, data: unknown) => {
    switch (eventName) {
      case "page_navigate": {
        if (data === undefined) {
          location.reload();
        } else {
          location.href = data as string;
        }
        break;
      }
    }
  };

  const processChat = async (input?: string) => {
    sending.value = true;

    const events = await circuit?.streamEvents(
      {
        Input: input,
        ...(activeChatDef!.Inputs ?? {}),
      },
      {
        version: "v2",
        configurable: { thread_id: activeChat },
        recursionLimit: 100,
      },
    );

    if (events) {
      for await (const event of events) {
        console.log(event.event);
        if (props.streamEvents!.includes(event.event)) {
          const chunk = event.data?.chunk;

          if (chunk) {
            processMessageChunk(chunk as StringPromptValue | AIMessageChunk);
          }
        } else if (
          event.event === "on_custom_event" &&
          event.event.startsWith("thinky:")
        ) {
          console.log("thinky-event");
          console.log(event.name);
          processThinkyEvent(event.event.replace("thinky:", ""), event.data);
        }
      }

      const resp = (await circuit?.invoke(
        {},
        { configurable: { thread_id: activeChat, peek: true } },
      )) as { Messages: BaseMessage[] };

      messages.value = resp?.Messages || [];
    }

    sending.value = false;
  };

  const handleSetActiveChat = (chat: string | undefined) => {
    setActiveChat(chat);
  };

  const sendMessage = (input: string) => {
    console.log("sendMessage");
    console.log(input);

    const work = async () => {
      await processChat(input);
    };

    messages.value = [...messages.value, new HumanMessage(input)];

    setTimeout(work, 0);
  };

  useEffect(() => {
    const work = async () => {
      const resp = (await circuit?.invoke(
        {},
        { configurable: { thread_id: activeChat, peek: true } },
      )) as { Messages: BaseMessage[] };

      messages.value = resp?.Messages || [];

      processChat();
    };

    work();
  }, [activeChat]);

  useEffect(() => {
    const chats = Object.keys(props.chats || {}).reduce((acc, chat) => {
      if (props.groupChats?.includes(chat)) {
        if (!acc.groups) {
          acc.groups = {};
        }

        acc.groups[chat] = props.chats[chat];
      } else {
        if (!acc._) {
          acc._ = {};
        }

        acc._[chat] = props.chats[chat];
      }

      return acc;
    }, {} as ChatSets);

    setChats(chats);
  }, [props.chats]);

  return (
    <div class="flex flex-col h-[calc(100vh_-_64px)]">
      <div class="flex-grow flex overflow-y-hidden">
        <div class="flex-1 overflow-y-auto">{props.children}</div>

        <div class="flex-grow flex flex-col p-2 max-w-sm shadow-inner">
          {!props.hideChatHeader && (
            <Chats
              activeChat={activeChat}
              chats={chats || {}}
              onActiveChatSet={handleSetActiveChat}
              class="shadow-inner"
            />
          )}

          {activeChat && <ChatMessages messages={messages} sending={sending} />}
        </div>
      </div>

      <ChatInput sending={sending} onSendMessage={sendMessage} />
    </div>
  );
}
