import {
  AIMessage,
  AIMessageChunk,
  type BaseMessage,
  classSet,
  type ComponentChildren,
  HumanMessage,
  type JSX,
  RemoteRunnable,
  type Runnable,
  type StringPromptValue,
  useEffect,
  useState,
} from "../../src.deps.ts";
import ChatMessages from "./ChatMessages.tsx";
import ChatInput from "./ChatInput.tsx";

export const IsIsland = true;

export type Thinky2Props = {
  chatId: string;

  circuitLookup: string;

  children: ComponentChildren;

  inputs?: Record<string, unknown>;

  jwt: string;

  onChatState?: (chatState: Record<string, unknown>) => void;

  renderMessage?: (message: BaseMessage) => string;

  root: string;

  streamEvents?: string[];
} & JSX.HTMLAttributes<HTMLDivElement>;

export default function Thinky2({
  chatId,
  circuitLookup,
  inputs,
  jwt,
  onChatState,
  renderMessage,
  root,
  streamEvents,
  ...props
}: Thinky2Props): JSX.Element {
  const [circuit, setCircuit] = useState<Runnable>();

  const [messages, setMessages] = useState<BaseMessage[]>([]);

  const [sending, setSending] = useState(true);

  if (!streamEvents?.length) {
    streamEvents = ["on_chat_model_stream", "on_llm_stream"]; //, "on_chain_stream"];
  }

  // deno-lint-ignore no-explicit-any
  const waitFor = (handler: (...args: any[]) => void | Promise<void>) =>
    new Promise<void>((resolve) => {
      setTimeout(async (e) => {
        await handler(e);

        resolve();
      }, 0);
    });

  const peekCircuit = async () => {
    const resp = (await circuit?.invoke(
      {
        ...(inputs ?? {}),
      },
      {
        configurable: {
          thread_id: chatId,
          checkpoint_ns: "current",
          peek: true,
        },
      },
    )) as { Messages: BaseMessage[] };

    setMessages(resp?.Messages || []);

    onChatState?.(resp);
  };

  const processMessageChunk = async (
    chunk: StringPromptValue | AIMessageChunk,
    lastMsg: BaseMessage,
  ): Promise<BaseMessage> => {
    const chunkValue = chunk instanceof AIMessageChunk
      ? chunk.content.toString()
      : typeof chunk === "string"
      ? chunk
      : chunk.value;

    if (chunkValue) {
      lastMsg.content += chunkValue;

      await waitFor(() => setMessages([...messages.slice(0, -1), lastMsg]));
    }

    return lastMsg;
  };

  const processThinky2Event = (eventName: string, data: unknown) => {
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

  const processChat = (input?: string) => {
    setSending(true);

    waitFor(async () => {
      const events = await circuit?.streamEvents(
        {
          Input: input,
          ...(inputs ?? {}),
        },
        {
          version: "v2",
          configurable: { thread_id: chatId, checkpoint_ns: "current" },
          recursionLimit: 100,
        },
      );

      if (events) {
        const msgs = messages;

        let lastMsg = messages.slice(-1)[0];

        if (input) {
          messages.push(new HumanMessage(input));
        }

        if (!(lastMsg instanceof AIMessage)) {
          msgs.push(new AIMessage(""));
        }

        lastMsg = msgs.slice(-1)[0];

        waitFor(() => setMessages([...msgs.slice(0, -1), lastMsg]));

        for await (const event of events) {
          if (streamEvents!.includes(event.event)) {
            const chunk = event.data?.chunk;

            if (chunk) {
              waitFor(async () => {
                lastMsg = await processMessageChunk(
                  chunk as StringPromptValue | AIMessageChunk,
                  lastMsg,
                );
              });
            }
          } else if (
            event.event === "on_custom_event" &&
            event.event.startsWith("Thinky2:")
          ) {
            console.log("Thinky2-event");
            console.log(event.name);
            waitFor(
              async () =>
                await processThinky2Event(
                  event.event.replace("Thinky2:", ""),
                  event.data,
                ),
            );
          }
        }

        await peekCircuit();
      }

      setSending(false);
    });
  };

  const sendMessage = (input: string) => {
    waitFor(async () => {
      await processChat(input);
    });
  };

  useEffect(() => {
    const circuit = new RemoteRunnable({
      url: `${root}${circuitLookup}`,
      options: {
        headers: { Authorization: `Bearer ${jwt}` },
      },
      fetch: fetch.bind(window),
    });

    setCircuit(circuit);
  }, [circuitLookup, root, jwt]);

  useEffect(() => {
    const work = async () => {
      await peekCircuit();

      processChat();
    };

    setSending(true);

    waitFor(work);
  }, [circuit]);

  return (
    <div class={classSet(["-:flex -:flex-col -:h-full"], props)}>
      <div class="flex-grow flex overflow-y-hidden">
        <div class="flex-1 overflow-y-auto">{props.children}</div>

        <div class="flex-grow flex flex-col p-2 max-w-sm shadow-inner">
          <ChatMessages
            messages={messages}
            renderMessage={renderMessage}
            sending={sending}
          />
        </div>
      </div>

      <ChatInput sending={sending} onSendMessage={(e) => sendMessage(e)} />
    </div>
  );
}
