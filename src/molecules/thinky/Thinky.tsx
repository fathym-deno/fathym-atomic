import {
  AIMessage,
  AIMessageChunk,
  type BaseMessage,
  type ComponentChildren,
  HumanMessage,
  type JSX,
  RemoteRunnable,
  type Runnable,
  type StringPromptValue,
  useEffect,
  useState,
} from "../../src.deps.ts";
import type { ChatSet } from "./ChatSet.ts";
import type { ChatSets } from "./ChatSets.ts";
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

  renderMessage?: (message: BaseMessage) => string;

  root: string;

  streamEvents?: string[];
} & JSX.HTMLAttributes<HTMLDivElement>;

export default function Thinky(props: ThinkyProps): JSX.Element {
  const [activeChat, setActiveChat] = useState(props.activeChat);

  const [chats, setChats] = useState<ChatSets>();

  const [circuit, setCircuit] = useState<Runnable>();

  const [messages, setMessages] = useState<BaseMessage[]>([]);

  const [sending, setSending] = useState(!props.activeChat);

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
      let lastMsg = messages.slice(-1)[0];

      if (!(lastMsg instanceof AIMessage)) {
        lastMsg = new AIMessage(chunkValue);

        setMessages([...messages, lastMsg]);
      } else {
        lastMsg.content += chunkValue;

        setMessages([...messages.slice(0, -1), lastMsg]);
      }
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
    setSending(true);

    const events = await circuit?.streamEvents(
      {
        Input: input,
        ...(props.chats[activeChat!]!.Inputs ?? {}),
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
            setTimeout(
              () =>
                processMessageChunk(
                  chunk as StringPromptValue | AIMessageChunk,
                ),
              0,
            );
          }
        } else if (
          event.event === "on_custom_event" &&
          event.event.startsWith("thinky:")
        ) {
          console.log("thinky-event");
          console.log(event.name);
          setTimeout(
            () =>
              processThinkyEvent(
                event.event.replace("thinky:", ""),
                event.data,
              ),
            0,
          );
        }
      }

      const resp = (await circuit?.invoke(
        {},
        { configurable: { thread_id: activeChat, peek: true } },
      )) as { Messages: BaseMessage[] };

      setMessages(resp?.Messages || []);
    }

    setSending(false);
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

    setMessages([...messages, new HumanMessage(input)]);

    setTimeout(work, 0);
  };

  useEffect(() => {
    setActiveChat(props.activeChat);
  }, [props.activeChat]);

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

  useEffect(() => {
    const circuit = props.chats[activeChat!]
      ? new RemoteRunnable({
        url: `${props.root}${props.chats[activeChat!].CircuitLookup}`,
        options: {
          headers: { Authorization: `Bearer ${props.jwt}` },
        },
        fetch: fetch.bind(window),
      })
      : undefined;

    setCircuit(circuit);
  }, [activeChat, chats]);

  useEffect(() => {
    const work = async () => {
      const resp = (await circuit?.invoke(
        {},
        { configurable: { thread_id: activeChat, peek: true } },
      )) as { Messages: BaseMessage[] };

      setMessages(resp?.Messages || []);

      processChat();
    };

    work();
  }, [circuit]);

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

          {activeChat && (
            <ChatMessages
              messages={messages}
              renderMessage={props.renderMessage}
              sending={sending}
            />
          )}
        </div>
      </div>

      <ChatInput sending={sending} onSendMessage={sendMessage} />
    </div>
  );
}
