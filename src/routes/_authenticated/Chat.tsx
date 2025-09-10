import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthProvider";
import conversationsService from "@/services/conversations";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { AxiosResponse } from "axios";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export const Route = createFileRoute("/_authenticated/Chat")({
  component: RouteComponent,
});

interface Conversation {
  id: number;
  user: {
    id: number;
    avatar: string;
    email: string;
  };
  messages: {
    id: number;
    sender_id: number;
    content: string;
  }[];
}

function RouteComponent() {
  const ws = useRef<WebSocket | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<string>("");
  const { user } = useAuth();

  const { data, isLoading: loading } = useQuery({
    queryFn: conversationsService.get,
    queryKey: ["conversations"],
  });

  const [activeConversation, setActiveConversation] = useState<number | null>(
    null
  );

  const { data: singleConversationData, isLoading: loadingSingle } = useQuery<
    AxiosResponse<Conversation>
  >({
    queryFn: () => conversationsService.getOne(activeConversation!),
    queryKey: ["conversations", activeConversation],
    enabled: !!activeConversation,
  });

  const conversations = data?.data;
  const singleConversation = singleConversationData?.data;

  const queryClient = useQueryClient();
  useEffect(() => {
    const websocket = new WebSocket("ws://localhost:8000/ws");
    ws.current = websocket;
    websocket.onopen = () => {
      console.log("connected");
    };
    websocket.onmessage = (event) => {
      console.log(event);
      const data = JSON.parse(event.data);
      if (data.type === "new_message") {
        queryClient.setQueryData(
          ["conversations", data.conversation_id],
          (oldData: AxiosResponse<Conversation>) => {
            const { type, ...messageData } = data;
            return {
              ...oldData,
              data: {
                ...oldData.data,
                messages: [...oldData.data.messages, messageData],
              },
            };
          }
        );
        setMessage("");
        messagesContainerRef.current?.scrollTo(
          0,
          messagesContainerRef.current.scrollHeight
        );
      }
    };

    return () => {
      websocket.close();
    };
  }, [queryClient]);

  const onSend = () => {
    if (ws.current) {
      ws.current.send(
        JSON.stringify({
          type: "message",
          conversation_id: 2,
          sender_id: user.id,
          content: message,
        })
      );
    }
  };

  console.log(singleConversation);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (conversations) {
    return (
      <div className="flex gap-1 h-[calc(100vh-2rem)]">
        <ul className="w-20 list-none">
          {conversations.map(
            (conversation: {
              id: number;
              user: {
                id: number;
                avatar: string;
                email: string;
              };
            }) => (
              <li
                key={conversation.id}
                onClick={() => setActiveConversation(conversation.id)}
                className=""
              >
                <img
                  src={conversation.user.avatar}
                  className="size-16 rounded-full border border-gray-200"
                />
                {/* // show name on hover */}
                {/* <span className="hov">
                  {conversation.user.email}
                </span> */}
              </li>
            )
          )}
        </ul>
        <div className="h-full flex-1 flex flex-col">
          <div
            className="flex-1 h-[calc(100vh-3rem)] overflow-scroll"
            ref={messagesContainerRef}
          >
            {singleConversation &&
              singleConversation.messages.map((message) => (
                <div className="flex flex-col w-full mb-2" key={message.id}>
                  <div
                    className={twMerge(
                      "p-4 bg-blue-200 rounded-lg",
                      message.sender_id === parseInt(user.id)
                        ? "self-end"
                        : "self-start"
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
          </div>
          <div className="flex gap-4">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="p-8"
              placeholder="Your message"
            />
            <Button type="button" onClick={onSend} className="h-full">
              Send
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
