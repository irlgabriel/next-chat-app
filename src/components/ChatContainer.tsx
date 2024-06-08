import { alpha, Box, InputBase, useTheme } from "@mui/material";
import React, {
  FormEventHandler,
  MutableRefObject,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Message, User } from "../../types";
import ChatMessage from "./ChatMessage";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface Props {
  from?: User;
  to?: User;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string
);

const ChatContainer = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { from, to, messages, setMessages } = props;

  ChatContainer.displayName = "ChatContainer";

  const theme = useTheme();

  const [chatInput, setChatInput] = useState("");

  const onSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    async (e) => {
      e.preventDefault();

      const data = new FormData(e.currentTarget);

      const inputText = data.get("message") as string;

      if (from && to && inputText) {
        const message: Message = {
          text: inputText,
          user: from,
          timestamp: new Date().getDate(),
        };
        setMessages((messages) => [...messages, message]);
        setChatInput("");

        await new Promise<void>(async (resolve) => {
          const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
          });
          let text = "Generic response";
          try {
            const result = await model.generateContent(inputText);
            const response = await result.response;
            text = response.text();
          } catch (e) {
            console.log(e);
          }

          setMessages((messages) => [
            ...messages,
            {
              text: text,
              user: to,
              timestamp: Date.now(),
            },
          ]);
          resolve();
        });
      }
    },
    [from, setMessages, to]
  );

  useEffect(() => {
    if (ref) {
      const element = (ref as MutableRefObject<HTMLDivElement>).current;
      element.scrollTo(0, element.scrollHeight);
    }
  }, [messages, ref]);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        height: "calc(100% - 82px)",
      }}
      position="relative"
    >
      {/** CHAT BODY */}
      <Box
        ref={ref}
        sx={{
          height: "100%",
          margin: "auto",
          overflowY: "scroll",
          scrollbarWidth: 0,
          padding: theme.spacing(3),
          paddingBottom: "72px",
          backgroundColor: alpha("#f4f4f4", 0.5),
          "::-webkit-scrollbar": { display: "none" },
        }}
      >
        {messages.map((message) => (
          <ChatMessage
            key={`message-timestamp-${message.timestamp}`}
            {...message}
          />
        ))}
      </Box>
      {/** BOTTOM CHAT INPUT */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          bottom: 0,
          height: "72px",
          overflow: "hidden",
          backgroundColor: theme.palette.background.default,
          zIndex: theme.zIndex.tooltip,
        }}
        component="form"
        onSubmit={onSubmit}
      >
        <InputBase
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Type your message.."
          fullWidth
          type="text"
          sx={{
            bottom: "0",
            left: "24px",
            width: "calc(100% - 48px)",
            padding: theme.spacing(1),
            borderRadius: "8px",
            backgroundColor: theme.palette.background.paper,
          }}
          name="message"
          id="message"
        />
      </Box>
    </Box>
  );
});

export default ChatContainer;
