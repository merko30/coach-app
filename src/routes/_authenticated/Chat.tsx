import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { AxiosResponse } from "axios";
import { MessageSquare } from "lucide-react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthProvider";
import useWebsocket from "@/hooks/useWebsocket";

import ConversationList from "@/components/Chat/ConversationList";

import conversationsService from "@/services/conversations";

import type { Conversation } from "@/types/conversations";
import { twMerge } from "tailwind-merge";

const ActiveConversation = lazy(
  () => import("@/components/Chat/ActiveConversation")
);

export const Route = createFileRoute("/_authenticated/Chat")({
  component: RouteComponent,
});

function RouteComponent() {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<string>("");
  const [activeConversation, setActiveConversation] = useState<number | null>(
    null
  );
  const [error, setError] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const { user } = useAuth();

  const { data, isLoading: loading } = useQuery({
    queryFn: conversationsService.get,
    queryKey: ["conversations"],
  });
  const conversations = data?.data;

  const ws = useWebsocket({
    onEvent: (event) => {
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
    },
  });

  const onSend = () => {
    setError(false);
    if (!message.length) {
      setError(true);
      return;
    }
    if (ws) {
      ws.send(
        JSON.stringify({
          type: "message",
          conversation_id: 2,
          sender_id: user.id,
          content: message,
        })
      );
    }
  };

  useEffect(() => {
    const onKeydown = (event: KeyboardEvent) => {
      // Only trigger when focused on the message input
      const target = event.target as HTMLElement;
      if (target && target.tagName === "INPUT") {
        if (event.key === "Enter") {
          event.preventDefault(); // prevent form submission
          onSend();
        }
      }
    };

    document.addEventListener("keydown", onKeydown);

    return () => document.removeEventListener("keydown", onKeydown);
  }, [onSend]); // include onSend if it uses state like message

  if (loading) {
    return <div>Loading...</div>;
  }

  if (conversations) {
    return (
      <div className="flex gap-1 h-[calc(100vh-2rem)]">
        <ConversationList
          conversations={conversations}
          onChangeConversation={(conversationId) =>
            setActiveConversation(conversationId)
          }
        />
        <div className="h-full flex-1 flex flex-col">
          {activeConversation ? (
            <Suspense
              fallback={
                <div className="flex-1 h-[calc(100vh-3rem)] bg-gray-50 animate-pulse rounded-md" />
              }
            >
              <ActiveConversation
                conversationId={activeConversation}
                ref={messagesContainerRef}
              />
            </Suspense>
          ) : (
            <div className="flex-1 h-[calc(100vh-3rem)] mb-4 bg-gray-50 rounded-md flex flex-col items-center justify-center text-gray-400 gap-4">
              <MessageSquare size={48} />
              <span className="text-xl font-medium">Select a conversation</span>
            </div>
          )}

          <div className="flex gap-4">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={twMerge(
                "p-8",
                error &&
                  "border-red-500 focus-visible:border-red-500 focus-visible:shadow-lg focus-visible:ring-2 focus-visible:ring-red-300"
              )}
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
